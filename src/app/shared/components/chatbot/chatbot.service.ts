// ============================================================================
// NEXUS — ChatbotService
// Signal-based service with partial keyword matching engine
// ============================================================================

import { Injectable, computed, resource, signal } from '@angular/core';
import {
  CodeLanguage,
  ContentBlock,
  Message,
  SearchResult,
  Suggestion,
} from './chatbot';
import { ALL_TOPIC_CONSTANTS } from '@app/features/topics/constants/registry';
import { ITopicContent } from '@app/shared';

export interface ChatbotData {
  meta: {
    version: string;
    title: string;
    description: string;
  };
  messages: Message[];
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private dataUrl = 'assets/data/angular21-chatbot.json';

  // ─── Resource ──────────────────────────────────────────────────────────────
  private chatbotResource = resource<ChatbotData, object>({
    loader: async () => {
      const response = await fetch(this.dataUrl);
      if (!response.ok) throw new Error(`Failed to load data: ${response.status}`);
      return response.json() as Promise<ChatbotData>;
    },
  });

  // ─── State Signals ──────────────────────────────────────────────────────────
  readonly searchQuery = signal<string>('');
  readonly isSearching = signal<boolean>(false);
  readonly activeSuggestion = signal<Suggestion | null>(null);

  // ─── Computed Signals ───────────────────────────────────────────────────────

  /** All messages loaded from JSON + Constants */
  readonly allMessages = computed<Message[]>(() => {
    const jsonMsgs = this.chatbotResource.value()?.messages ?? [];
    const constantMsgs = ALL_TOPIC_CONSTANTS.map((topic, index) => 
      this.mapTopicToMessage(topic, `const-${index}`)
    );
    return [...jsonMsgs, ...constantMsgs];
  });

  /** Resource loading state */
  readonly isLoading = computed(() => this.chatbotResource.isLoading());
  readonly error = computed(() => this.chatbotResource.error() as string | any);

  /**
   * Partial-match search results, sorted by relevance score.
   */
  readonly searchResults = computed<SearchResult[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const messages = this.allMessages();
    if (!query || query.length < 2) return [];

    const results: SearchResult[] = [];

    for (const message of messages) {
      const relevanceScore = this.scoreMessage(message, query);
      if (relevanceScore <= 0) continue;

      results.push({
        message,
        relevanceScore,
        matchedKeywords: this.getMatchedKeywords(message, query),
        hasCodeExamples: this.hasCodeExamples(message),
        relatedTopics: this.getRelatedTopics(message, messages),
      });
    }

    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  });

  /** Top 5 results as plain Message array (for display) */
  readonly topSearchResults = computed<Message[]>(() =>
    this.searchResults().slice(0, 5).map(r => r.message)
  );

  /** All unique keywords across all messages */
  readonly allTopics = computed<string[]>(() => {
    const kw = new Set<string>();
    for (const m of this.allMessages()) m.keywords?.forEach(k => kw.add(k));
    return Array.from(kw).sort();
  });

  /** Contextual suggestion chips from top search result */
  readonly currentSuggestions = computed<Suggestion[]>(() => {
    const results = this.searchResults();
    if (!results.length) return [];

    const top = results[0];
    const suggestions: Suggestion[] = [];

    if (top.hasCodeExamples) {
      suggestions.push({
        type: 'code',
        label: '💻 Show me code examples',
        action: 'show_code_examples',
        messageId: top.message.id,
      });
    }

    for (const topic of top.relatedTopics.slice(0, 2)) {
      suggestions.push({
        type: 'related',
        label: `🔗 Explore: ${topic}`,
        action: `search_${topic}`,
        messageId: top.message.id,
      });
    }

    suggestions.push(
      { type: 'practice', label: '🎯 Try a practice exercise', action: 'practice_mode', messageId: top.message.id },
      { type: 'read_more', label: '📚 Read more about this', action: 'read_more', messageId: top.message.id }
    );

    return suggestions;
  });

  // ─── Mapping Logic ─────────────────────────────────────────────────────────

  private mapTopicToMessage(topic: ITopicContent, id: string): Message {
    const contents: ContentBlock[] = [];

    // Add paragraphs
    if (topic.paragraphs?.length) {
      contents.push({ type: 'text', text: topic.paragraphs.join(' ') });
    }

    // Add sections
    if (topic.sections?.length) {
      topic.sections.forEach(s => {
        const sectionContents: ContentBlock[] = [];
        if (s.content) sectionContents.push({ type: 'text', text: s.content });
        if (s.list?.length) sectionContents.push({ type: 'list', items: s.list, ordered: false });
        if (s.additionalExplanation) sectionContents.push({ type: 'quote', text: s.additionalExplanation });
        
        contents.push({
          type: 'section',
          title: s.heading || 'Details',
          contents: sectionContents
        });
      });
    }

    // Add code examples
    if (topic.codeExamples?.length) {
      topic.codeExamples.forEach(ce => {
        contents.push({
          type: 'section',
          title: `Example: ${ce.title}`,
          contents: [
            { type: 'text', text: ce.description || '' },
            { type: 'code', code: ce.code, language: (ce.language?.toLowerCase() as CodeLanguage) || 'typescript', filename: ce.title }
          ]
        });
      });
    }

    // Add best practices
    if (topic.bestPractices?.length) {
      contents.push({
        type: 'section',
        title: 'Best Practices',
        contents: [{ type: 'list', items: topic.bestPractices, ordered: false }]
      });
    }

    // Extract all keywords including from sections
    const keywords = new Set<string>([
      ...(topic.title ? [topic.title] : []),
      ...(topic.tags || [])
    ]);
    
    topic.sections?.forEach(s => {
      if (s.heading) keywords.add(s.heading);
    });

    return {
      id,
      sender: 'bot',
      timestamp: new Date(),
      text: `## ${topic.title}\n\n${topic.paragraphs?.[0] || ''}`,
      keywords: Array.from(keywords),
      contents
    };
  }

  // ─── Public Methods ─────────────────────────────────────────────────────────

  /** Trigger a keyword search */
  search(query: string): void {
    const q = query.trim();
    this.searchQuery.set(q);
    this.isSearching.set(q.length >= 2);
  }

  /** Clear search state */
  clearSearch(): void {
    this.searchQuery.set('');
    this.isSearching.set(false);
    this.activeSuggestion.set(null);
  }

  /** Dispatch a suggestion action */
  handleSuggestion(suggestion: Suggestion): void {
    this.activeSuggestion.set(suggestion);

    switch (suggestion.type) {
      case 'code': this.searchQuery.set('code'); break;
      case 'example': this.searchQuery.set('example'); break;
      case 'practice': this.launchPracticeMode(); break;
      case 'related':
        if (suggestion.action.startsWith('search_')) {
          this.search(suggestion.action.replace('search_', '').replace(/_/g, ' '));
        }
        break;
      case 'read_more': 
        if (suggestion.messageId) {
          const msg = this.getMessageById(suggestion.messageId);
          if (msg) this.searchQuery.set(msg.keywords?.[0] || msg.text || '');
        }
        break;
    }
  }

  /** Get messages that match a keyword exactly */
  getMessagesByKeyword(keyword: string): Message[] {
    return this.allMessages().filter(m =>
      m.keywords?.some(k => k.toLowerCase() === keyword.toLowerCase())
    );
  }

  /** Lookup a single message by id */
  getMessageById(id: string): Message | undefined {
    return this.allMessages().find(m => m.id === id);
  }

  /** NEXUS welcome message */
  getWelcomeMessage(): Message {
    return {
      id: 'welcome',
      sender: 'bot',
      timestamp: new Date(),
      text: "👋 Hi! I'm NEXUS — your Angular 21 intelligence assistant.\n\nI can now search through all the **training modules** dynamically! Try searching for things like:\n- **Signals**\n- **Forms**\n- **RxJS**\n- **Standalone Components**",
      suggestions: [
        { type: 'example', label: '⚡ Signals', action: 'search_signals' },
        { type: 'example', label: '🧩 Components', action: 'search_components' },
        { type: 'example', label: '🔁 Routing', action: 'search_routing' },
        { type: 'example', label: '📝 Forms', action: 'search_forms' },
        { type: 'practice', label: '🎯 Start practice', action: 'practice_mode' },
      ],
    };
  }

  /** Reload resource */
  reload(): void {
    this.chatbotResource.reload();
  }

  // ─── Partial-Match Scoring Engine ──────────────────────────────────────────

  /**
   * Score a message against a query using layered partial matching.
   */
  private scoreMessage(message: Message, query: string): number {
    const q = query.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(t => t.length >= 2);
    let score = 0;

    for (const kw of (message.keywords ?? [])) {
      const k = kw.toLowerCase();
      let kwScore = 0;

      // Whole-query vs keyword
      if (k === q) kwScore = Math.max(kwScore, 30); // Higher weight for exact keyword
      else if (k.startsWith(q)) kwScore = Math.max(kwScore, 20);
      else if (k.includes(q)) kwScore = Math.max(kwScore, 15);
      else if (q.startsWith(k) && k.length >= 3) kwScore = Math.max(kwScore, 10);

      // Per-token matching
      for (const t of tokens) {
        if (k === t) kwScore = Math.max(kwScore, 20);
        else if (k.startsWith(t)) kwScore = Math.max(kwScore, 12);
        else if (k.includes(t)) kwScore = Math.max(kwScore, 8);
      }

      score += kwScore;
    }

    // Text field matching
    if (message.text?.toLowerCase().includes(q)) score += 5;

    // Deep content JSON matching
    const json = JSON.stringify(message.contents ?? []).toLowerCase();
    if (json.includes(q)) score += 10;
    for (const t of tokens) {
      if (json.includes(t) && t.length >= 3) score += 4;
    }

    return score;
  }

  private getMatchedKeywords(message: Message, query: string): string[] {
    const q = query.toLowerCase();
    const tokens = q.split(/\s+/).filter(t => t.length >= 2);
    return (message.keywords ?? []).filter(kw => {
      const k = kw.toLowerCase();
      return (
        k.includes(q) ||
        q.includes(k) ||
        tokens.some(t => k.includes(t) || t.includes(k))
      );
    });
  }

  private hasCodeExamples(message: Message): boolean {
    return (message.contents ?? []).some(
      c => c.type === 'code' ||
        (c.type === 'section' && 'contents' in c && c.contents?.some(sc => sc.type === 'code'))
    );
  }

  private getRelatedTopics(message: Message, allMessages: Message[]): string[] {
    const related: string[] = [];
    const own = new Set((message.keywords ?? []).map(k => k.toLowerCase()));

    for (const other of allMessages) {
      if (other.id === message.id) continue;
      for (const kw of (other.keywords ?? [])) {
        const kl = kw.toLowerCase();
        if (own.has(kl) && !related.includes(kw)) {
          related.push(kw);
          if (related.length >= 4) return related;
        }
      }
    }
    return related;
  }

  // ─── Private Action Handlers ────────────────────────────────────────────────

  private launchPracticeMode(): void {
    const pm = this.allMessages().find(m =>
      m.keywords?.some(k => k.toLowerCase().includes('practice') || k.toLowerCase().includes('exercise'))
    );
    if (pm) this.search(pm.keywords?.[0] || 'practice');
    else this.search('practice');
  }
}