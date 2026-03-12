import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnDestroy,
  computed,
  effect,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  text: string;
  code?: string;
  timestamp: Date;
  suggestions?: string[];
}

interface KbTopic {
  id: string;
  title: string;
  keywords: string[];
  shortAnswer: string;
  fullAnswer: string;
  codeExample?: string;
  suggestions: string[];
}

interface KbFaq {
  question: string;
  answer: string;
  suggestions: string[];
}

interface KnowledgeBase {
  meta: { version: string; released: string; description: string };
  topics: KbTopic[];
  faq: KbFaq[];
}

const KB_PATH = 'assets/data/angular21-knowledge-base.json';

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

type VoiceMode = 'bg' | 'active' | 'idle';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements AfterViewInit, OnDestroy {

  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private msgContainer = viewChild<ElementRef>('messagesContainer');
  private inputRef = viewChild<ElementRef>('inputRef');

  kb = signal<KnowledgeBase | null>(null);
  kbError = signal(false);

  isOpen = signal(false);
  isTyping = signal(false);
  currentMessage = signal('');
  unreadCount = signal(0);
  lastHeard = signal(''); // debug: shows what bg mode heard
  messages = signal<ChatMessage[]>([{
    id: uid(),
    type: 'bot',
    text: "Hi! I'm your Angular 21 AI Assistant. I know Signals, Zoneless, Signal Forms, Routing, RxJS, @defer, Testing, SSR and much more. What would you like to learn?",
    timestamp: new Date(),
    suggestions: ['What are Signals?', 'Zoneless Change Detection', 'Signal Forms', 'Getting Started']
  }]);

  isListening = signal(false);
  isBackgroundListening = signal(false);
  isSpeechSupported = signal(false);
  voiceBtnTitle = computed(() => {
    if (!this.isSpeechSupported()) return 'Voice not supported in this browser';
    return this.isListening() ? 'Stop recording' : 'Click to speak';
  });

  private sr: any = null;
  private voiceMode: VoiceMode = 'idle';
  private pendingMode: VoiceMode = 'idle';

  // ── Wake words ────────────────────────────────────────────────────────────
  // IMPORTANT: "ngAI" is not a real word — Chrome mis-transcribes it wildly.
  // Use real English phrases Chrome reliably recognises.
  // The debug bar above will show you exactly what Chrome heard so you can
  // tune this list yourself.
  private readonly WAKE_WORDS: string[] = [
    // Primary (real English — highest accuracy)
    'hey angular',
    'ok angular',
    'ok google',
    'okay angular',
    'okay google',
    'hello angular'

  ];

  private _dragging = false;
  iconPos = signal({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  winPos = signal({ x: 0, y: 0 });

  constructor() {
    effect(() => { this.messages(); this.scrollToBottom(); });
    effect(() => { this.iconPos(); this.updateWinPos(); });
  }

  ngAfterViewInit(): void {
    this.loadKnowledgeBase();
    this.initSpeech();
  }

  ngOnDestroy(): void {
    this.voiceMode = 'idle';
    this.pendingMode = 'idle';
    try { this.sr?.stop(); } catch (_) { }
  }

  // ── Knowledge base ────────────────────────────────────────────────────────
  private loadKnowledgeBase(): void {
    this.http
      .get<KnowledgeBase>(KB_PATH)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: kb => this.kb.set(kb),
        error: () => {
          this.kbError.set(true);
          console.warn('[Chatbot] KB load failed — using fallback responses.');
        }
      });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SPEECH  — single instance, two modes (bg ↔ active)
  // ═══════════════════════════════════════════════════════════════════════════

  private initSpeech(): void {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { this.isSpeechSupported.set(false); return; }

    this.isSpeechSupported.set(true);
    this.sr = new SR();
    this.sr.lang = 'en-US';

    // ── onstart ──────────────────────────────────────────────────────────
    this.sr.onstart = () => {
      if (this.voiceMode === 'active') {
        this.isListening.set(true);
        this.isBackgroundListening.set(false);
      } else if (this.voiceMode === 'bg') {
        this.isBackgroundListening.set(true);
        this.isListening.set(false);
      }
    };

    // ── onresult ─────────────────────────────────────────────────────────
    this.sr.onresult = (e: any) => {

      if (this.voiceMode === 'bg') {
        // Collect ALL alternatives from ALL results in this event
        // Chrome might put the best match in alt[1] or alt[2], not always alt[0]
        const transcripts: string[] = [];
        for (let r = 0; r < e.results.length; r++) {
          for (let a = 0; a < e.results[r].length; a++) {
            const t = e.results[r][a].transcript.toLowerCase().trim();
            if (t) transcripts.push(t);
          }
        }

        // Show the first alternative in the debug bar
        if (transcripts.length > 0) {
          this.lastHeard.set(transcripts[0]);
          // Auto-clear the debug label after 4 s
          setTimeout(() => this.lastHeard.set(''), 4000);
          // Log ALL alternatives so you can see exactly what Chrome heard
          console.log('[Chatbot bg] heard:', transcripts);
        }

        // Check every collected transcript for wake words
        if (transcripts.some(t => this.isWakeWord(t))) {
          this.handleWakeWord();
        }
        return;
      }

      // ── Active mode: collect interim + final speech ─────────────────
      if (this.voiceMode === 'active') {
        let finalText = '';
        let interimText = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) finalText += e.results[i][0].transcript;
          else interimText += e.results[i][0].transcript;
        }
        this.currentMessage.set(finalText || interimText);
      }
    };

    // ── onerror ──────────────────────────────────────────────────────────
    this.sr.onerror = (e: any) => {
      console.warn('[Chatbot] Speech error:', e.error, '| mode:', this.voiceMode);
      if (e.error === 'not-allowed' || e.error === 'permission-denied') {
        alert('Microphone access denied. Please allow it in your browser settings to use voice.');
        this.isSpeechSupported.set(false);
      }
      // 'aborted' and 'no-speech' are normal — handled by onend
    };

    // ── onend ────────────────────────────────────────────────────────────
    // Fires whenever the session ends — naturally or via .stop()
    this.sr.onend = () => {
      const wasActive = this.voiceMode === 'active';
      this.isListening.set(false);
      this.isBackgroundListening.set(false);
      this.voiceMode = 'idle';

      // Auto-send message when active recording finishes
      if (wasActive) {
        const msg = this.currentMessage().trim();
        if (msg) setTimeout(() => this.sendMessage(), 80);
      }

      // Switch to next requested mode, or default back to bg
      const next = this.pendingMode;
      this.pendingMode = 'idle';

      // Chrome needs a small pause between sessions — 200 ms is reliable
      setTimeout(() => {
        if (next === 'active') {
          this.startMode('active');
        } else {
          // Always return to bg after any session ends
          this.startMode('bg');
        }
      }, 200);
    };

    // Boot: start background listening on init
    this.startMode('bg');
  }

  // ── Configure the instance for the requested mode and call .start() ───────
  private startMode(mode: VoiceMode): void {
    if (!this.sr || !this.isSpeechSupported() || mode === 'idle') return;
    if (mode === 'bg' && this.isListening()) return;
    if (mode === 'active' && this.isBackgroundListening()) return; // safety

    this.voiceMode = mode;

    if (mode === 'bg') {
      // Continuous, no interim — we only care about final transcripts for wake words
      // maxAlternatives = 5 gives Chrome room to return phonetically close matches
      this.sr.continuous = true;
      this.sr.interimResults = false;
      this.sr.maxAlternatives = 5;
    } else {
      // Non-continuous — ends naturally when user stops speaking,
      // which triggers onend → auto-send.  interimResults shows live text.
      this.sr.continuous = false;
      this.sr.interimResults = true;
      this.sr.maxAlternatives = 1;
    }

    try {
      this.sr.start();
    } catch (e: any) {
      if (e?.name === 'InvalidStateError') {
        // Already running — stop it and retry once it ends
        this.pendingMode = mode;
        try { this.sr.stop(); } catch (_) { }
      }
    }
  }

  // ── Wake-word matching ────────────────────────────────────────────────────
  private isWakeWord(transcript: string): boolean {
    console.log(transcript)
    // Exact / substring match against the wake-word list
    if (this.WAKE_WORDS.some(w => transcript.includes(w))) return true;

    // Fuzzy fallback: transcript starts with "hey" or "ok" AND contains "ang"
    // Catches: "hey angle", "ok angle", "hey ankle", "hey engle" etc.
    if (/^(hey|ok|hi|hello)\s/.test(transcript) && transcript.includes('ang')) return true;

    return false;
  }

  private handleWakeWord(): void {
    console.log('[Chatbot] Wake word detected! Opening active recording…');
    if (this.isOpen()) {
      this.pendingMode = 'active';
      try { this.sr.stop(); } catch (_) { }
    } else {
      this.toggleChat();
      this.pendingMode = 'active';
      try { this.sr.stop(); } catch (_) { }
    }
  }

  // ── Public: mic button click ──────────────────────────────────────────────
  toggleVoice(): void {
    if (!this.isSpeechSupported()) return;

    if (this.isListening()) {
      // Stop active listening → onend will restart bg
      this.pendingMode = 'bg';
      try { this.sr.stop(); } catch (_) { }
    } else {
      // Start active listening
      if (this.voiceMode === 'idle') {
        this.startMode('active');
      } else {
        this.pendingMode = 'active';
        try { this.sr.stop(); } catch (_) { }
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAT
  // ═══════════════════════════════════════════════════════════════════════════

  sendMessage(text?: string): void {
    const raw = (text ?? this.currentMessage()).trim();
    if (!raw || this.isTyping()) return;

    this.addMessage({ type: 'user', text: raw });
    this.currentMessage.set('');
    this.isTyping.set(true);

    setTimeout(() => {
      const response = this.buildResponse(raw);
      this.isTyping.set(false);
      this.addMessage(response);
      if (!this.isOpen()) this.unreadCount.update(n => n + 1);
    }, 600 + Math.random() * 700);
  }

  private addMessage(partial: Omit<ChatMessage, 'id' | 'timestamp'>): void {
    this.messages.update(msgs => [
      ...msgs,
      { id: uid(), timestamp: new Date(), ...partial }
    ]);
  }

  clearChat(): void {
    this.messages.set([{
      id: uid(),
      type: 'bot',
      text: 'Conversation cleared! What Angular 21 topic can I help you with?',
      timestamp: new Date(),
      suggestions: ['Signals', 'Zoneless', 'Signal Forms', 'Angular ARIA']
    }]);
    this.unreadCount.set(0);
  }

  private buildResponse(query: string): Omit<ChatMessage, 'id' | 'timestamp'> {
    const kb = this.kb();

    if (/^(hi|hello|hey|howdy|yo|sup|greetings)\b/i.test(query)) {
      return {
        type: 'bot',
        text: "Hello! 👋 I'm your Angular 21 expert. Ask me about Signals, Zoneless, Signal Forms, Routing, HttpClient, @defer, Testing, SSR, or anything Angular 21!",
        suggestions: ['What are Signals?', 'Getting Started', 'Signal Forms', 'Deferrable Views (@defer)']
      };
    }

    if (/\b(all topics?|list topics?|what can you|help)\b/i.test(query)) {
      const titles = kb?.topics.map(t => t.title).join(', ')
        ?? 'Signals, Zoneless, Signal Forms, Components, Routing, DI, HttpClient, RxJS, @defer, SSR, NgRx Signal Store, ARIA, Pipes, Directives, Testing, Performance';
      return {
        type: 'bot',
        text: `I can answer questions about: ${titles}. What would you like to explore?`,
        suggestions: ['Signals', 'Zoneless', 'Signal Forms', 'Testing']
      };
    }

    if (kb) {
      const faq = this.matchFaq(query, kb.faq);
      if (faq) return { type: 'bot', text: faq.answer, suggestions: faq.suggestions };
    }

    if (kb) {
      const topic = this.matchTopic(query, kb.topics);
      if (topic) {
        const wantCode = /\b(example|code|how|syntax|show|sample|demo)\b/i.test(query);
        return {
          type: 'bot',
          text: wantCode ? topic.fullAnswer : topic.shortAnswer,
          code: wantCode && topic.codeExample ? topic.codeExample : undefined,
          suggestions: topic.suggestions
        };
      }
    }

    if (!kb) {
      return {
        type: 'bot',
        text: 'The knowledge base is still loading. Try asking "What are Signals?" once it loads!',
        suggestions: ['What are Signals?', 'Zoneless Change Detection', 'Getting Started']
      };
    }

    const fallbacks = [
      `I couldn't find an exact match for "${query}". Try: "What is zoneless?" or "Show me a Signals example".`,
      `Try asking about a specific feature like Signals, Signal Forms, @defer, or Routing.`,
      `Angular 21's biggest features are Signals, Zoneless, and Signal Forms — pick one!`
    ];
    return {
      type: 'bot',
      text: fallbacks[Math.floor(Math.random() * fallbacks.length)],
      suggestions: ['Signals', 'Zoneless Change Detection', 'Signal Forms', 'Getting Started']
    };
  }

  private matchTopic(query: string, topics: KbTopic[]): KbTopic | null {
    const lower = query.toLowerCase();
    let best: KbTopic | null = null;
    let bestScore = 0;
    for (const topic of topics) {
      let score = 0;
      const tl = topic.title.toLowerCase();
      if (lower.includes(tl)) score += 30;
      if (tl.includes(lower)) score += 20;
      for (const kw of topic.keywords) {
        if (lower.includes(kw)) score += 10;
      }
      for (const word of lower.split(/\s+/).filter(w => w.length > 2)) {
        if (topic.keywords.some(k => k.includes(word) || word.includes(k))) score += 4;
        if (tl.split(' ').some(t => t.includes(word))) score += 3;
      }
      if (score > bestScore) { bestScore = score; best = topic; }
    }
    return bestScore >= 8 ? best : null;
  }

  private matchFaq(query: string, faqs: KbFaq[]): KbFaq | null {
    const lower = query.toLowerCase();
    const words = lower.split(/\s+/).filter(w => w.length > 3);
    for (const faq of faqs) {
      if (words.filter(w => faq.question.toLowerCase().includes(w)).length >= 2) return faq;
    }
    return null;
  }

  copyCode(code: string): void {
    navigator.clipboard?.writeText(code).catch(() => { });
  }

  toggleChat(): void {
    if (this._dragging) return;
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      this.unreadCount.set(0);
      this.updateWinPos();
      setTimeout(() => this.inputRef()?.nativeElement?.focus(), 160);
    }
  }

  private scrollToBottom(): void {
    const el = this.msgContainer()?.nativeElement;
    if (el) setTimeout(() => (el.scrollTop = el.scrollHeight), 60);
  }

  onIconMousedown(event: MouseEvent): void {
    event.preventDefault();
    this._dragging = false;
    const startX = event.clientX - this.iconPos().x;
    const startY = event.clientY - this.iconPos().y;
    const onMove = (e: MouseEvent) => {
      this._dragging = true;
      this.iconPos.set({
        x: Math.max(20, Math.min(window.innerWidth - 68, e.clientX - startX)),
        y: Math.max(20, Math.min(window.innerHeight - 68, e.clientY - startY))
      });
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      setTimeout(() => (this._dragging = false), 80);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  private updateWinPos(): void {
    const { x, y } = this.iconPos();
    const W = 390, H = 540;
    let wx = x - W + 60;
    let wy = y - H + 20;
    if (wx < 16) wx = 16;
    if (wy < 16) wy = y + 80;
    if (wx + W > window.innerWidth - 16) wx = window.innerWidth - W - 16;
    if (wy + H > window.innerHeight - 16) wy = window.innerHeight - H - 16;
    this.winPos.set({ x: wx, y: wy });
  }

  @HostListener('window:resize')
  onResize(): void {
    const p = this.iconPos();
    this.iconPos.set({
      x: Math.min(p.x, window.innerWidth - 68),
      y: Math.min(p.y, window.innerHeight - 68)
    });
  }
}