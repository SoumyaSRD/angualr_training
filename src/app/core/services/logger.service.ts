import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    NONE = 4,
}

export interface LogEntry {
    timestamp: Date;
    level: LogLevel;
    message: string;
    context?: string;
    data?: unknown;
}

@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    private readonly minLevel: LogLevel;
    private readonly logs: LogEntry[] = [];
    private readonly maxLogs = 100;

    constructor() {
        // Set minimum log level based on environment
        this.minLevel = environment.production ? LogLevel.WARN : LogLevel.DEBUG;
    }

    /**
     * Log debug message
     */
    debug(message: string, data?: unknown, context?: string): void {
        this.log(LogLevel.DEBUG, message, data, context);
    }

    /**
     * Log info message
     */
    info(message: string, data?: unknown, context?: string): void {
        this.log(LogLevel.INFO, message, data, context);
    }

    /**
     * Log warning message
     */
    warn(message: string, data?: unknown, context?: string): void {
        this.log(LogLevel.WARN, message, data, context);
    }

    /**
     * Log error message
     */
    error(message: string, error?: unknown, context?: string): void {
        this.log(LogLevel.ERROR, message, error, context);
    }

    /**
     * Get all logs
     */
    getLogs(): LogEntry[] {
        return [...this.logs];
    }

    /**
     * Get logs by level
     */
    getLogsByLevel(level: LogLevel): LogEntry[] {
        return this.logs.filter((log) => log.level === level);
    }

    /**
     * Clear all logs
     */
    clearLogs(): void {
        this.logs.length = 0;
    }

    /**
     * Export logs as JSON
     */
    exportLogs(): string {
        return JSON.stringify(this.logs, null, 2);
    }

    /**
     * Main log method
     */
    private log(level: LogLevel, message: string, data?: unknown, context?: string): void {
        if (level < this.minLevel) {
            return;
        }

        const entry: LogEntry = {
            timestamp: new Date(),
            level,
            message,
            context,
            data,
        };

        // Store log
        this.logs.push(entry);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // Output to console with styling
        this.outputToConsole(entry);
    }

    /**
     * Output log entry to console with styling
     */
    private outputToConsole(entry: LogEntry): void {
        const { timestamp, level, message, context, data } = entry;
        const timeStr = timestamp.toISOString().split('T')[1].split('.')[0];
        const contextStr = context ? `[${context}]` : '';

        const styles = this.getConsoleStyles(level);
        const levelLabel = LogLevel[level].padStart(5);

        const prefix = `%c${timeStr} %c${levelLabel}%c ${contextStr}`;

        switch (level) {
            case LogLevel.DEBUG:
                console.debug(prefix, 'color: #6b7280', styles, '', message, data ?? '');
                break;
            case LogLevel.INFO:
                console.info(prefix, 'color: #6b7280', styles, '', message, data ?? '');
                break;
            case LogLevel.WARN:
                console.warn(prefix, 'color: #6b7280', styles, '', message, data ?? '');
                break;
            case LogLevel.ERROR:
                console.error(prefix, 'color: #6b7280', styles, '', message, data ?? '');
                break;
        }
    }

    /**
     * Get console styles for log level
     */
    private getConsoleStyles(level: LogLevel): string {
        const base = 'padding: 2px 6px; border-radius: 3px; font-weight: bold;';

        switch (level) {
            case LogLevel.DEBUG:
                return `${base} background: #e5e7eb; color: #374151;`;
            case LogLevel.INFO:
                return `${base} background: #dbeafe; color: #1d4ed8;`;
            case LogLevel.WARN:
                return `${base} background: #fef3c7; color: #b45309;`;
            case LogLevel.ERROR:
                return `${base} background: #fee2e2; color: #b91c1c;`;
            default:
                return base;
        }
    }
}
