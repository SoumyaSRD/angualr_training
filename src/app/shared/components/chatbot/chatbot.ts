// ============================================================================
// NEXUS — Neural Expert Understanding System
// Types, Interfaces & Helper Functions
// ============================================================================

export type ContentType =
    | 'text' | 'code' | 'table' | 'image' | 'link'
    | 'video' | 'list' | 'quote' | 'section';

export type CodeLanguage =
    | 'typescript' | 'html' | 'css' | 'javascript'
    | 'python' | 'bash' | 'json' | 'sql' | 'yaml';

// ─── Content Block Types ─────────────────────────────────────────────────────

export interface CodeBlock {
    type: 'code';
    language: CodeLanguage;
    code: string;
    filename?: string;
    lineNumbers?: boolean;
}

export interface TableContent {
    type: 'table';
    headers: string[];
    rows: (string | number)[][];
    striped?: boolean;
}

export interface ImageContent {
    type: 'image';
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
    maxWidth?: string;
}

export interface LinkContent {
    type: 'link';
    text: string;
    url: string;
    external?: boolean;
    icon?: string;
}

export interface VideoContent {
    type: 'video';
    url: string;
    title?: string;
    poster?: string;
    width?: string;
    height?: string;
}

export interface ListContent {
    type: 'list';
    items: string[];
    ordered?: boolean;
    nested?: ListContent[];
}

export interface QuoteContent {
    type: 'quote';
    text: string;
    author?: string;
    citation?: string;
}

export interface SectionContent {
    type: 'section';
    title: string;
    subtitle?: string;
    contents: ContentBlock[];
}

export type ContentBlock =
    | { type: 'text'; text: string }
    | CodeBlock
    | TableContent
    | ImageContent
    | LinkContent
    | VideoContent
    | ListContent
    | QuoteContent
    | SectionContent;

// ─── Core Models ─────────────────────────────────────────────────────────────

export interface ChatbotSource {
    title: string;
    url: string;
    section_title?: string;
    page_id?: string;
    images?: string[];
}

export interface Message {
    id?: string;
    text?: string;
    sender: 'user' | 'bot';
    contents?: ContentBlock[];
    images?: string[];
    sources?: ChatbotSource[];
    timestamp?: Date;
    metadata?: Record<string, unknown>;
    keywords?: string[];
    suggestions?: Suggestion[];
}

export interface Suggestion {
    type: 'code' | 'example' | 'read_more' | 'related' | 'practice';
    label: string;
    action: string;
    messageId?: string;
}

export interface SearchResult {
    message: Message;
    relevanceScore: number;
    matchedKeywords: string[];
    hasCodeExamples: boolean;
    relatedTopics: string[];
}

export interface ChatbotConfig {
    title?: string;
    placeholder?: string;
    welcomeMessage?: string;
    currentUser?: string;
    enableVoice?: boolean;
    enableSourceLinks?: boolean;
    enableImageDownload?: boolean;
    enableSyntaxHighlight?: boolean;
    apiTimeout?: number;
    maxMessages?: number;
    theme?: 'light' | 'dark' | 'auto';
}

// ─── Type Guards ─────────────────────────────────────────────────────────────

export function isTextContent(c: ContentBlock): c is { type: 'text'; text: string } {
    return c.type === 'text';
}

export function isCodeBlock(c: ContentBlock): c is CodeBlock {
    return c.type === 'code';
}

export function isTableContent(c: ContentBlock): c is TableContent {
    return c.type === 'table';
}

export function isImageContent(c: ContentBlock): c is ImageContent {
    return c.type === 'image';
}

export function isLinkContent(c: ContentBlock): c is LinkContent {
    return c.type === 'link';
}

export function isVideoContent(c: ContentBlock): c is VideoContent {
    return c.type === 'video';
}

export function isListContent(c: ContentBlock): c is ListContent {
    return c.type === 'list';
}

export function isQuoteContent(c: ContentBlock): c is QuoteContent {
    return c.type === 'quote';
}

export function isSectionContent(c: ContentBlock): c is SectionContent {
    return c.type === 'section';
}

// ─── Factory Helpers ─────────────────────────────────────────────────────────

export function createTextBlock(text: string): ContentBlock {
    return { type: 'text', text };
}

export function createCodeBlock(
    code: string,
    language: CodeLanguage,
    filename?: string
): CodeBlock {
    return { type: 'code', language, code, filename, lineNumbers: true };
}

export function createTable(
    headers: string[],
    rows: (string | number)[][],
    striped = true
): TableContent {
    return { type: 'table', headers, rows, striped };
}

export function createList(items: string[], ordered = false): ListContent {
    return { type: 'list', items, ordered };
}

export function createQuote(text: string, author?: string, citation?: string): QuoteContent {
    return { type: 'quote', text, author, citation };
}

export function createSection(
    title: string,
    contents: ContentBlock[],
    subtitle?: string
): SectionContent {
    return { type: 'section', title, subtitle, contents };
}

export function createBotMessage(text?: string, contents?: ContentBlock[]): Message {
    return {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        text,
        sender: 'bot',
        contents,
        timestamp: new Date(),
    };
}

export function createUserMessage(text: string): Message {
    return {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        text,
        sender: 'user',
        timestamp: new Date(),
    };
}