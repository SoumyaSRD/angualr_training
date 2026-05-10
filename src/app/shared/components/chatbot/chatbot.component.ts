// ============================================================================
// NEXUS — ChatbotComponent
// Signal-based Angular 21 standalone component
// ============================================================================

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  afterNextRender,
  computed,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ChatbotConfig,
  CodeBlock,
  ContentBlock,
  ImageContent,
  LinkContent,
  ListContent,
  Message,
  QuoteContent,
  SectionContent,
  Suggestion,
  TableContent,
  VideoContent,
  createBotMessage,
  createUserMessage,
} from './chatbot';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'lib-nexus-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatbotComponent implements OnInit {

  // ─── Injected service (protected so template can access) ──────────────────
  protected chatbotService = inject(ChatbotService);

  // ─── Config Input ─────────────────────────────────────────────────────────
  config = input<ChatbotConfig>({
    title: 'NEXUS',
    placeholder: 'Ask about signals, components, routing…',
    welcomeMessage: "👋 Hi! I'm NEXUS — your Angular 21 intelligence assistant.",
    enableVoice: true,
    enableSourceLinks: true,
    enableSyntaxHighlight: true,
    apiTimeout: 600,
    maxMessages: 100,
    theme: 'dark',
  });

  // ─── ViewChild Refs ────────────────────────────────────────────────────────
  chatBodyRef = viewChild<ElementRef<HTMLDivElement>>('chatBody');
  textareaRef = viewChild<ElementRef<HTMLTextAreaElement>>('textarea');
  searchInputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  toggleBtnRef = viewChild<ElementRef<HTMLButtonElement>>('toggleBtn');

  // ─── UI State Signals ──────────────────────────────────────────────────────
  messages = signal<Message[]>([]);
  userInput = model('');
  isOpen = signal(false);
  loading = signal(false);
  expanded = signal(false);
  showSearch = signal(false);

  // Voice state
  isListening = signal(false);
  listeningError = signal('');

  // Drag state — chat container
  isDragging = signal(false);
  dragPosition = signal({ x: 0, y: 0 });
  private dragStartPos = { x: 0, y: 0 };
  private initialDragPos = { x: 0, y: 0 };

  // Drag state — toggle button
  isToggleDragging = signal(false);
  toggleDragPosition = signal({ x: 0, y: 0 });
  private toggleDragStartPos = { x: 0, y: 0 };
  private initialTogglePos = { x: 0, y: 0 };

  // Copy-to-clipboard feedback per message id
  copiedId = signal<string | null>(null);

  // ─── Computed Signals ──────────────────────────────────────────────────────

  /** Messages to display — search results override local history */
  visibleMessages = computed<Message[]>(() => {
    if (this.chatbotService.isSearching() && this.chatbotService.searchQuery()) {
      return this.chatbotService.topSearchResults();
    }
    const all = this.messages();
    const max = this.config().maxMessages ?? 100;
    return all.slice(Math.max(0, all.length - max));
  });

  hasMessages = computed(() => this.visibleMessages().length > 0);
  isLoadingData = computed(() => this.chatbotService.isLoading());
  loadError = computed(() => this.chatbotService.error());

  // ─── Speech Recognition ────────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private recognition: any;

  constructor() {
    afterNextRender(() => {
      this.scrollToBottom();
      this.initVoiceRecognition();
    });
  }

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.messages.set([this.chatbotService.getWelcomeMessage()]);
  }

  // ─── Voice Methods ─────────────────────────────────────────────────────────

  private initVoiceRecognition(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    this.recognition = new SR();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onresult = (event: any) => {
      this.userInput.set(event.results[0][0].transcript);
      this.isListening.set(false);
      setTimeout(() => this.sendMessage(), 100);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onerror = (event: any) => {
      this.listeningError.set(`Speech error: ${event.error}`);
      this.isListening.set(false);
    };

    this.recognition.onend = () => this.isListening.set(false);
  }

  toggleVoice(): void {
    if (!this.recognition) {
      this.listeningError.set('Voice input not supported in this browser.');
      return;
    }
    if (this.isListening()) {
      this.recognition.stop();
    } else {
      this.listeningError.set('');
      this.isListening.set(true);
      this.recognition.start();
    }
  }

  // ─── Search Methods ────────────────────────────────────────────────────────

  toggleSearch(): void {
    this.showSearch.update(v => !v);
    if (this.showSearch()) {
      setTimeout(() => this.searchInputRef()?.nativeElement?.focus({ preventScroll: true }), 50);
    } else {
      this.clearSearch();
    }
  }

  onSearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.chatbotService.search(query);
  }

  clearSearch(): void {
    this.chatbotService.clearSearch();
  }

  // ─── Chat Controls ─────────────────────────────────────────────────────────

  toggleChat(): void {
    const wasOpen = this.isOpen();
    this.isOpen.set(!wasOpen);
    
    if (!wasOpen) {
      // Just opened: position above toggle
      const toggleEl = this.toggleBtnRef()?.nativeElement;
      if (toggleEl) {
        const rect = toggleEl.getBoundingClientRect();
        const panelWidth = this.expanded() ? 920 : 440;
        const panelHeight = 660; // Expected height
        
        // Calculate X: center with toggle, clamp to viewport
        let x = rect.left + (rect.width / 2) - (panelWidth / 2);
        // Calculate Y: above toggle with gap
        let y = rect.top - panelHeight - 20;

        // Viewport boundaries
        x = Math.max(10, Math.min(x, window.innerWidth - panelWidth - 10));
        
        // If Y is too small (panel off top), stick to top or move below toggle?
        // Let's stick to top with gap
        if (y < 10) {
          y = 10;
          // If it still overlaps toggle, move it left/right? 
          // For now, simple clamp.
        }

        this.dragPosition.set({ x, y });
      }

      setTimeout(() => {
        this.textareaRef()?.nativeElement?.focus({ preventScroll: true });
        this.scrollToBottom();
      }, 100);
    }
  }

  onIconClick(): void {
    if (this.isToggleDragging()) return;
    this.toggleChat();
  }

  toggleExpand(): void {
    this.expanded.update(v => !v);
    // Re-check position after expansion to prevent going off-screen
    setTimeout(() => {
      const pos = this.dragPosition();
      this.updateDragPosition(pos.x, pos.y);
      this.scrollToBottom();
    }, 50);
  }

  // ─── Send Message ──────────────────────────────────────────────────────────

  sendMessage(): void {
    const text = this.userInput().trim();
    if (!text || this.loading()) return;

    const userMsg = createUserMessage(text);
    this.messages.update(msgs => [...msgs, userMsg]);
    this.userInput.set('');
    this.loading.set(true);
    this.chatbotService.clearSearch();
    this.scrollToBottom();

    const timeout = this.config().apiTimeout ?? 600;

    setTimeout(() => {
      this.chatbotService.search(text);
      const results = this.chatbotService.searchResults();

      if (results.length > 0) {
        const top = results[0];
        const botMsg: Message = {
          ...createBotMessage(top.message.text, top.message.contents),
          suggestions: top.message.suggestions,
          keywords: top.message.keywords,
        };
        this.messages.update(msgs => [...msgs, botMsg]);
      } else {
        const fallback = createBotMessage(
          `I couldn't find specific info about "${text}". Try one of these topics:`
        );
        fallback.suggestions = [
          { type: 'example', label: '⚡ Signals', action: 'search_signals' },
          { type: 'example', label: '🧩 Components', action: 'search_components' },
          { type: 'example', label: '🔁 Routing', action: 'search_routing' },
          { type: 'example', label: '📝 Forms', action: 'search_forms' },
          { type: 'practice', label: '🎯 Start practice', action: 'practice_mode' },
        ];
        this.messages.update(msgs => [...msgs, fallback]);
      }

      this.loading.set(false);
      this.chatbotService.clearSearch();
      this.scrollToBottom();
    }, timeout);
  }

  /** Clear chat history and restore welcome message */
  deleteHistory(): void {
    this.messages.set([this.chatbotService.getWelcomeMessage()]);
  }

  handleEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  autoResize(event: Event): void {
    const el = event.target as HTMLTextAreaElement;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }

  // ─── Suggestion Chips ──────────────────────────────────────────────────────

  onSuggestionClick(suggestion: Suggestion): void {
    if (suggestion.action.startsWith('search_')) {
      const query = suggestion.action.replace('search_', '').replace(/_/g, ' ');
      this.userInput.set(query);
      this.sendMessage();
    } else if (suggestion.action === 'practice_mode') {
      const msg = createBotMessage('🎯 Practice mode activated! Type any Angular topic you want to explore and I\'ll give you detailed examples.');
      this.messages.update(msgs => [...msgs, msg]);
      this.scrollToBottom();
    } else {
      this.chatbotService.handleSuggestion(suggestion);
    }
  }

  // ─── Clipboard ─────────────────────────────────────────────────────────────

  copyToClipboard(text: string, id?: string): void {
    navigator.clipboard.writeText(text).then(() => {
      if (id) {
        this.copiedId.set(id);
        setTimeout(() => this.copiedId.set(null), 2000);
      }
    });
  }

  isCopied(id: string): boolean {
    return this.copiedId() === id;
  }

  // ─── Toggle Button Drag (Pointer Events) ──────────────────────────────────

  onTogglePointerDown(event: PointerEvent): void {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    
    this.toggleDragStartPos = { x: event.clientX, y: event.clientY };
    this.initialTogglePos = { x: rect.left, y: rect.top };
    this.isToggleDragging.set(false); // Initially false, will set to true on move

    button.setPointerCapture(event.pointerId);
  }

  onTogglePointerMove(event: PointerEvent): void {
    if (!this.toggleDragStartPos.x) return;

    const dx = event.clientX - this.toggleDragStartPos.x;
    const dy = event.clientY - this.toggleDragStartPos.y;

    // Start dragging if moved more than 5px
    if (!this.isToggleDragging() && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      this.isToggleDragging.set(true);
    }

    if (this.isToggleDragging()) {
      const x = Math.max(0, Math.min(this.initialTogglePos.x + dx, window.innerWidth - 65));
      const y = Math.max(0, Math.min(this.initialTogglePos.y + dy, window.innerHeight - 65));
      this.toggleDragPosition.set({ x, y });
    }
  }

  onTogglePointerUp(event: PointerEvent): void {
    this.toggleDragStartPos = { x: 0, y: 0 };
    // We keep isToggleDragging true briefly to prevent click if moved
    setTimeout(() => this.isToggleDragging.set(false), 50);
  }

  getToggleStyle(): Record<string, string> {
    const { x, y } = this.toggleDragPosition();
    if (!x && !y) return {};
    return { 
      position: 'fixed', 
      left: `${x}px`, 
      top: `${y}px`, 
      right: 'auto', 
      bottom: 'auto',
      margin: '0' 
    };
  }

  // ─── Container Drag (Pointer Events) ───────────────────────────────────────

  onPointerDown(event: PointerEvent): void {
    const target = event.target as HTMLElement;
    // Only drag from header or empty areas, not buttons/inputs
    if (target.closest('button') || target.closest('input')) return;

    const panel = (event.currentTarget as HTMLElement).closest('.nexus-panel') as HTMLElement;
    const rect = panel.getBoundingClientRect();
    
    this.dragStartPos = { x: event.clientX, y: event.clientY };
    this.initialDragPos = { x: rect.left, y: rect.top };
    this.isDragging.set(true);

    panel.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging()) return;

    const dx = event.clientX - this.dragStartPos.x;
    const dy = event.clientY - this.dragStartPos.y;

    this.updateDragPosition(this.initialDragPos.x + dx, this.initialDragPos.y + dy);
  }

  onPointerUp(): void {
    this.isDragging.set(false);
  }

  private updateDragPosition(rawX: number, rawY: number): void {
    const width = this.expanded() ? 920 : 440;
    const height = 660; // Approximate or use actual
    
    const x = Math.max(0, Math.min(rawX, window.innerWidth - 40));
    const y = Math.max(0, Math.min(rawY, window.innerHeight - 80));
    
    this.dragPosition.set({ x, y });
  }

  getContainerStyle(): Record<string, string> {
    const { x, y } = this.dragPosition();
    if (!x && !y) return {};
    return { 
      position: 'fixed', 
      left: `${x}px`, 
      top: `${y}px`, 
      right: 'auto', 
      bottom: 'auto',
      margin: '0'
    };
  }

  // ─── Type Guards (for template) ────────────────────────────────────────────

  isTextContent = (c: ContentBlock): c is { type: 'text'; text: string } => c.type === 'text';
  isCodeBlock = (c: ContentBlock): c is CodeBlock => c.type === 'code';
  isTableContent = (c: ContentBlock): c is TableContent => c.type === 'table';
  isImageContent = (c: ContentBlock): c is ImageContent => c.type === 'image';
  isLinkContent = (c: ContentBlock): c is LinkContent => c.type === 'link';
  isVideoContent = (c: ContentBlock): c is VideoContent => c.type === 'video';
  isListContent = (c: ContentBlock): c is ListContent => c.type === 'list';
  isQuoteContent = (c: ContentBlock): c is QuoteContent => c.type === 'quote';
  isSectionContent = (c: ContentBlock): c is SectionContent => c.type === 'section';

  // ─── Utilities ─────────────────────────────────────────────────────────────

  formatUrl(url: string): string {
    return url ? url.replace('frontend/public', '').replace(/^\/+/, '/') : '#';
  }

  fileName(url: string): string {
    try {
      return new URL(url, window.location.origin).pathname.split('/').pop() || 'download';
    } catch {
      return 'download';
    }
  }

  trackByMsgId(_: number, msg: Message): string {
    return msg.id ?? String(_);
  }

  /** Simple markdown formatter for bot messages */
  formatMessage(text?: string): string {
    if (!text) return '';
    
    return text
      .replace(/^## (.*$)/gm, '<h2 class="text-gradient font-bold mt-sm mb-xs">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-accent font-bold mt-sm mb-xs">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
      .replace(/`(.*?)`/g, '<code class="glass-deep px-xs rounded text-accent">$1</code>')
      .replace(/\n/g, '<br>');
  }

  private scrollToBottom(): void {
    const el = this.chatBodyRef()?.nativeElement;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }

  private setTransparentDragImage(event: DragEvent): void {
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    event.dataTransfer?.setDragImage(img, 0, 0);
  }
}