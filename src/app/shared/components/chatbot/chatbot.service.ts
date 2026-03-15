// ============================================================================
// NEXUS — ChatbotService
// Signal-based service with partial keyword matching engine
// ============================================================================

import { Injectable, computed, resource, signal } from '@angular/core';
import {
  ContentBlock,
  Message,
  SearchResult,
  Suggestion,
} from './chatbot';

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
  private dataUrl = '/assets/data/angular21-chatbot.json';

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

  /** All messages loaded from JSON */
  readonly allMessages = computed<Message[]>(
    () => this.chatbotResource.value()?.messages ?? []
  );

  /** Resource loading state */
  readonly isLoading = computed(() => this.chatbotResource.isLoading());
  readonly error = computed(() => this.chatbotResource.error() as string | any);

  /**
   * Partial-match search results, sorted by relevance score.
   * Matches if any part of query appears anywhere in keyword (or vice versa).
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

  // ─── Public Methods ─────────────────────────────────────────────────────────

  /** Trigger a keyword search */
  search(query: string): void {
    this.searchQuery.set(query);
    this.isSearching.set(query.trim().length >= 2);
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
      case 'code': this.filterByCode(); break;
      case 'example': this.showExamples(); break;
      case 'practice': this.launchPracticeMode(); break;
      case 'related':
        if (suggestion.action.startsWith('search_')) {
          this.search(suggestion.action.replace('search_', '').replace(/_/g, ' '));
        }
        break;
      case 'read_more': this.showMoreDetails(suggestion.messageId); break;
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
      text: "👋 Hi! I'm NEXUS — your Angular 21 intelligence assistant. I understand partial queries, so typing \"sig\" finds Signals, \"comp\" finds Components, and so on!",
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
   *
   * Priority (highest → lowest):
   *  20 — exact keyword match
   *  14 — keyword starts with query
   *  10 — keyword contains query
   *   8 — query starts with keyword (abbreviation)
   *   6 — query contains keyword (multi-word)
   *   Per token: same rules at lower weights
   *   +2 — query appears anywhere in serialised content JSON
   *   +1 — each token that appears in content
   */
  private scoreMessage(message: Message, query: string): number {
    const tokens = query.split(/\s+/).filter(t => t.length >= 2);
    let score = 0;

    for (const kw of (message.keywords ?? [])) {
      const k = kw.toLowerCase();
      let kwScore = 0;

      // Whole-query vs keyword
      if (k === query) kwScore = Math.max(kwScore, 20);
      else if (k.startsWith(query)) kwScore = Math.max(kwScore, 14);
      else if (k.includes(query)) kwScore = Math.max(kwScore, 10);
      else if (query.startsWith(k) && k.length >= 3) kwScore = Math.max(kwScore, 8);
      else if (query.includes(k) && k.length >= 3) kwScore = Math.max(kwScore, 6);

      // Per-token matching
      for (const t of tokens) {
        if (k === t) kwScore = Math.max(kwScore, 13);
        else if (k.startsWith(t)) kwScore = Math.max(kwScore, 9);
        else if (k.includes(t)) kwScore = Math.max(kwScore, 6);
        else if (t.startsWith(k) && k.length >= 3) kwScore = Math.max(kwScore, 5);
        else if (t.includes(k) && k.length >= 3) kwScore = Math.max(kwScore, 3);
      }

      score += kwScore;
    }

    // Text field matching
    if (message.text?.toLowerCase().includes(query)) score += 2;

    // Deep content JSON matching
    const json = JSON.stringify(message.contents ?? []).toLowerCase();
    if (json.includes(query)) score += 2;
    for (const t of tokens) {
      if (json.includes(t) && t.length >= 3) score += 1;
    }

    return score;
  }

  private getMatchedKeywords(message: Message, query: string): string[] {
    const tokens = query.split(/\s+/).filter(t => t.length >= 2);
    return (message.keywords ?? []).filter(kw => {
      const k = kw.toLowerCase();
      return (
        k.includes(query) ||
        query.includes(k) ||
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
    const own = new Set(message.keywords ?? []);

    for (const other of allMessages) {
      if (other.id === message.id) continue;
      for (const kw of (other.keywords ?? [])) {
        if (own.has(kw) && !related.includes(kw)) {
          related.push(kw);
          if (related.length >= 3) return related;
        }
      }
    }
    return related;
  }

  private contentMatchesQuery(content: ContentBlock, query: string): boolean {
    switch (content.type) {
      case 'text': return content.text?.toLowerCase().includes(query) ?? false;
      case 'code': return (content.code?.toLowerCase().includes(query) || content.filename?.toLowerCase().includes(query)) ?? false;
      case 'table': return (content.headers?.some(h => h.toLowerCase().includes(query)) || content.rows?.some(r => r.some(c => String(c).toLowerCase().includes(query)))) ?? false;
      case 'list': return content.items?.some(i => i.toLowerCase().includes(query)) ?? false;
      case 'quote': return (content.text?.toLowerCase().includes(query) || content.author?.toLowerCase().includes(query)) ?? false;
      case 'section': return (content.title?.toLowerCase().includes(query) || content.contents?.some(c => this.contentMatchesQuery(c, query))) ?? false;
      case 'link': return content.text?.toLowerCase().includes(query) ?? false;
      case 'image': return content.alt?.toLowerCase().includes(query) ?? false;
      default: return false;
    }
  }

  // ─── Private Action Handlers ────────────────────────────────────────────────

  private filterByCode(): void {
    // Signal update triggers searchResults computed to re-run
    this.searchQuery.set('code');
  }

  private showExamples(): void {
    const ex = this.allMessages().find(m =>
      m.keywords?.includes('example') || m.keywords?.includes('demo')
    );
    if (ex) this.search(ex.text ?? 'examples');
  }

  private launchPracticeMode(): void {
    const pm = this.allMessages().find(m =>
      m.keywords?.includes('practice') || m.keywords?.includes('exercise')
    );
    if (pm) this.search(pm.text ?? 'practice');
  }

  private showMoreDetails(messageId?: string): void {
    if (!messageId) return;
    // Expose the message id for component to consume via activeSuggestion
    const msg = this.getMessageById(messageId);
    if (msg) this.searchQuery.set(msg.text ?? '');
  }
}