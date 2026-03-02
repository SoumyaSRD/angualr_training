import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, computed, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '@app/core';

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

interface SearchResult {
  topic: string;
  subTopic: string;
  route: string;
  relevance: number;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Draggable Chat Icon -->
    <div
      class="chatbot-icon"
      [class.open]="isOpen()"
      [style.left.px]="iconPosition().x"
      [style.top.px]="iconPosition().y"
      (mousedown)="startDrag($event)"
      (click)="toggleChat()"
      title="Ask me anything about Angular"
    >
      <div class="icon-glow"></div>
      <i class="bi" [class.bi-robot]="!isOpen()" [class.bi-x-lg]="isOpen()"></i>
      @if (unreadCount() > 0) {
        <span class="unread-badge">{{ unreadCount() }}</span>
      }
    </div>

    <!-- Chat Window -->
    @if (isOpen()) {
      <div
        class="chatbot-window"
        [style.left.px]="windowPosition().x"
        [style.top.px]="windowPosition().y"
      >
        <!-- Header -->
        <div class="chatbot-header">
          <div class="header-info">
            <div class="bot-avatar">
              <i class="bi bi-robot"></i>
            </div>
            <div class="header-text">
              <h4>Angular Assistant</h4>
              <span class="status">Online</span>
            </div>
          </div>
          <button class="close-btn" (click)="toggleChat()">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Messages -->
        <div class="chatbot-messages" #messagesContainer>
          @for (message of messages(); track $index) {
            <div class="message" [class.user]="message.type === 'user'" [class.bot]="message.type === 'bot'">
              <div class="message-avatar">
                <i class="bi" [class.bi-person-fill]="message.type === 'user'" [class.bi-robot]="message.type === 'bot'"></i>
              </div>
              <div class="message-content">
                <p>{{ message.text }}</p>
                @if (message.suggestions && message.suggestions.length > 0) {
                  <div class="suggestions">
                    @for (suggestion of message.suggestions; track $index) {
                      <button class="suggestion-chip" (click)="sendMessage(suggestion)">
                        {{ suggestion }}
                      </button>
                    }
                  </div>
                }
                <span class="timestamp">{{ message.timestamp | date:'shortTime' }}</span>
              </div>
            </div>
          }

          @if (isTyping()) {
            <div class="message bot typing">
              <div class="message-avatar">
                <i class="bi bi-robot"></i>
              </div>
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          }
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <button class="quick-btn" (click)="sendMessage('What is Angular?')">What is Angular?</button>
          <button class="quick-btn" (click)="sendMessage('Components')">Components</button>
          <button class="quick-btn" (click)="sendMessage('Services')">Services</button>
          <button class="quick-btn" (click)="sendMessage('Routing')">Routing</button>
        </div>

        <!-- Input -->
        <div class="chatbot-input">
          <input
            type="text"
            [(ngModel)]="currentMessage"
            (keyup.enter)="sendMessage()"
            placeholder="Ask about Angular topics..."
            #messageInput
          />
          <button class="send-btn" (click)="sendMessage()" [disabled]="!currentMessage().trim()">
            <i class="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
    }
  `,
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  private navigationService = inject(NavigationService);
  private messagesContainer = viewChild<ElementRef>('messagesContainer');

  // State signals
  isOpen = signal(false);
  isTyping = signal(false);
  currentMessage = signal('');
  messages = signal<ChatMessage[]>([
    {
      type: 'bot',
      text: 'Hello! I\'m your Angular learning assistant. Ask me anything about Angular topics, concepts, or how to use this training platform!',
      timestamp: new Date(),
      suggestions: ['What is Angular?', 'How do I start?', 'Show me topics']
    }
  ]);
  unreadCount = signal(0);

  // Dragging state
  isDragging = signal(false);
  dragOffset = signal({ x: 0, y: 0 });
  iconPosition = signal({ x: window.innerWidth - 100, y: window.innerHeight - 100 });

  // Window position (calculated based on icon position)
  windowPosition = signal({ x: 0, y: 0 });

  // Knowledge base from navigation topics
  private knowledgeBase = computed(() => this.buildKnowledgeBase());

  private buildKnowledgeBase() {
    const topics = this.navigationService.topics();
    const knowledge: Record<string, string[]> = {
      'angular': ['Angular is a platform for building mobile and desktop web applications.', 'It uses TypeScript and provides a component-based architecture.'],
      'component': ['Components are the building blocks of Angular applications.', 'Each component has a template, styles, and logic.'],
      'service': ['Services provide reusable business logic and data access.', 'They can be injected into components using dependency injection.'],
      'routing': ['Angular Router enables navigation between views.', 'You can configure routes with parameters and guards.'],
      'directive': ['Directives extend HTML with custom behavior.', 'Structural directives like *ngIf and *ngFor modify the DOM.'],
      'pipe': ['Pipes transform data in templates.', 'Built-in pipes include date, currency, and uppercase.'],
      'form': ['Angular provides template-driven and reactive forms.', 'Reactive forms offer more control and testing capabilities.'],
      'http': ['HttpClient makes HTTP requests to servers.', 'It supports interceptors for request/response handling.'],
      'observable': ['Observables handle asynchronous data streams.', 'They are used extensively with RxJS in Angular.'],
      'signal': ['Signals are a new reactive primitive in Angular.', 'They provide fine-grained reactivity with better performance.']
    };

    // Add topic-specific knowledge
    topics.forEach(topic => {
      const key = topic.title.toLowerCase().replace(/\s+/g, '');
      knowledge[key] = [
        `${topic.title} contains ${topic.subTopics.length} lessons.`,
        ...topic.subTopics.map(sub => sub.title)
      ];
    });

    return knowledge;
  }

  toggleChat() {
    if (this.isDragging()) return; // Don't toggle if dragging
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      this.unreadCount.set(0);
      this.updateWindowPosition();
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  // Dragging functionality
  startDrag(event: MouseEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    const startX = event.clientX - this.iconPosition().x;
    const startY = event.clientY - this.iconPosition().y;

    const onMouseMove = (e: MouseEvent) => {
      this.isDragging.set(true);
      const newX = Math.max(20, Math.min(window.innerWidth - 70, e.clientX - startX));
      const newY = Math.max(20, Math.min(window.innerHeight - 70, e.clientY - startY));
      this.iconPosition.set({ x: newX, y: newY });
      this.updateWindowPosition();
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setTimeout(() => this.isDragging.set(false), 50);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  private updateWindowPosition() {
    const icon = this.iconPosition();
    const windowWidth = 380;
    const windowHeight = 500;

    // Position window above the icon, or to the left if not enough space
    let x = icon.x - windowWidth + 60;
    let y = icon.y - windowHeight + 20;

    // Adjust if off-screen
    if (x < 20) x = 20;
    if (y < 20) y = icon.y + 70;

    this.windowPosition.set({ x, y });
  }

  sendMessage(text?: string) {
    const message = text || this.currentMessage().trim();
    if (!message) return;

    // Add user message
    this.messages.update(msgs => [...msgs, {
      type: 'user',
      text: message,
      timestamp: new Date()
    }]);

    this.currentMessage.set('');
    this.isTyping.set(true);
    this.scrollToBottom();

    // Simulate bot response
    setTimeout(() => {
      const response = this.generateResponse(message);
      this.isTyping.set(false);
      this.messages.update(msgs => [...msgs, response]);

      if (!this.isOpen()) {
        this.unreadCount.update(n => n + 1);
      }

      this.scrollToBottom();
    }, 800 + Math.random() * 600);
  }

  private generateResponse(query: string): ChatMessage {
    const lowerQuery = query.toLowerCase();
    const words = lowerQuery.split(/\s+/);

    // Search in knowledge base
    const knowledge = this.knowledgeBase();
    for (const [key, values] of Object.entries(knowledge)) {
      if (words.some(word => key.includes(word) || word.includes(key))) {
        return {
          type: 'bot',
          text: (values as string[])[Math.floor(Math.random() * (values as string[]).length)],
          timestamp: new Date(),
          suggestions: this.getRelatedSuggestions(key)
        };
      }
    }

    // Check for topic matches
    for (const topic of this.navigationService.topics()) {
      if (lowerQuery.includes(topic.title.toLowerCase())) {
        const subTopics = topic.subTopics.slice(0, 3).map((s: any) => s.title);
        return {
          type: 'bot',
          text: `I found the **${topic.title}** topic with ${topic.subTopics.length} lessons. Popular lessons include: ${subTopics.join(', ')}.`,
          timestamp: new Date(),
          suggestions: ['Show all topics', 'What is Angular?', 'Getting started']
        };
      }
    }

    // Default responses
    const defaults = [
      'I can help you learn about Angular! Try asking about components, services, routing, or any specific topic.',
      'Great question! I have information about Angular fundamentals, RxJS, forms, and more. What would you like to explore?',
      'I can guide you through Angular concepts. Browse the sidebar topics or ask me directly about any Angular feature!'
    ];

    return {
      type: 'bot',
      text: defaults[Math.floor(Math.random() * defaults.length)],
      timestamp: new Date(),
      suggestions: ['Components', 'Services', 'Routing', 'Forms']
    };
  }

  private getRelatedSuggestions(key: string): string[] {
    const suggestions: Record<string, string[]> = {
      'component': ['Services', 'Directives', 'Templates'],
      'service': ['Dependency Injection', 'HTTP Client', 'Component'],
      'routing': ['Route Guards', 'Lazy Loading', 'Navigation'],
      'form': ['Reactive Forms', 'Validation', 'Form Builder'],
      'observable': ['RxJS Operators', 'Subscriptions', 'Signals'],
      'signal': ['Computed Signals', 'Effects', 'Observables']
    };
    return suggestions[key] || ['Show all topics', 'What is Angular?', 'Getting started'];
  }

  private scrollToBottom() {
    const container = this.messagesContainer()?.nativeElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  @HostListener('window:resize')
  onResize() {
    // Keep icon within bounds on resize
    const pos = this.iconPosition();
    this.iconPosition.set({
      x: Math.min(pos.x, window.innerWidth - 70),
      y: Math.min(pos.y, window.innerHeight - 70)
    });
    this.updateWindowPosition();
  }
}
