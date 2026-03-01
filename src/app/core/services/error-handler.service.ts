import { Injectable, ErrorHandler, inject, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { ToastService } from './toast.service';

export enum ErrorCategory {
    HTTP = 'HTTP',
    VALIDATION = 'VALIDATION',
    RUNTIME = 'RUNTIME',
    UNKNOWN = 'UNKNOWN',
}

export interface AppError {
    category: ErrorCategory;
    message: string;
    code?: string | number;
    details?: unknown;
    timestamp: Date;
}

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
    private readonly logger = inject(LoggerService);
    private readonly toastService = inject(ToastService);
    private readonly ngZone = inject(NgZone);

    private readonly userFriendlyMessages: Record<string, string> = {
        '401': 'Your session has expired. Please sign in again.',
        '403': 'You do not have permission to perform this action.',
        '404': 'The requested resource was not found.',
        '500': 'An internal server error occurred. Please try again later.',
        '502': 'The server is temporarily unavailable. Please try again later.',
        '503': 'The service is currently unavailable. Please try again later.',
        '504': 'The request timed out. Please check your connection and try again.',
        'NETWORK_ERROR': 'Unable to connect to the server. Please check your internet connection.',
        'TIMEOUT': 'The request took too long to complete. Please try again.',
        'VALIDATION_ERROR': 'Please check your input and try again.',
        'UNKNOWN_ERROR': 'An unexpected error occurred. Please try again.',
    };

    /**
     * Main error handler method
     */
    handleError(error: unknown): void {
        const appError = this.categorizeError(error);

        // Log the error
        this.logger.error(appError.message, error, appError.category);

        // Show user-friendly toast for certain errors
        if (this.shouldShowToast(appError)) {
            this.ngZone.run(() => {
                this.toastService.show(
                    this.getUserFriendlyMessage(appError),
                    appError.category === ErrorCategory.HTTP ? 'error' : 'warning',
                    5000
                );
            });
        }

        // In development, also log to console
        if (!this.isProduction()) {
            console.error('Error details:', error);
        }
    }

    /**
     * Handle HTTP errors specifically
     */
    handleHttpError(error: HttpErrorResponse): AppError {
        const appError: AppError = {
            category: ErrorCategory.HTTP,
            message: error.message,
            code: error.status,
            details: error.error,
            timestamp: new Date(),
        };

        this.handleError(appError);
        return appError;
    }

    /**
     * Handle validation errors
     */
    handleValidationError(message: string, details?: Record<string, string[]>): AppError {
        const appError: AppError = {
            category: ErrorCategory.VALIDATION,
            message,
            details,
            timestamp: new Date(),
        };

        this.handleError(appError);
        return appError;
    }

    /**
     * Categorize error type
     */
    private categorizeError(error: unknown): AppError {
        // HTTP errors
        if (error instanceof HttpErrorResponse) {
            return {
                category: ErrorCategory.HTTP,
                message: error.message,
                code: error.status,
                details: error.error,
                timestamp: new Date(),
            };
        }

        // Already categorized errors
        if (this.isAppError(error)) {
            return error;
        }

        // Standard Error objects
        if (error instanceof Error) {
            return {
                category: ErrorCategory.RUNTIME,
                message: error.message,
                details: error.stack,
                timestamp: new Date(),
            };
        }

        // Unknown errors
        return {
            category: ErrorCategory.UNKNOWN,
            message: String(error) || 'An unknown error occurred',
            timestamp: new Date(),
        };
    }

    /**
     * Check if error is already categorized
     */
    private isAppError(error: unknown): error is AppError {
        return (
            typeof error === 'object' &&
            error !== null &&
            'category' in error &&
            'message' in error &&
            'timestamp' in error
        );
    }

    /**
     * Determine if toast should be shown for this error
     */
    private shouldShowToast(error: AppError): boolean {
        // Don't show toasts for validation errors (form handles those)
        if (error.category === ErrorCategory.VALIDATION) {
            return false;
        }

        // Don't show toasts for 401 (auth guard handles redirect)
        if (error.code === 401) {
            return false;
        }

        return true;
    }

    /**
     * Get user-friendly error message
     */
    private getUserFriendlyMessage(error: AppError): string {
        // Check for specific HTTP status codes
        if (error.code && this.userFriendlyMessages[String(error.code)]) {
            return this.userFriendlyMessages[String(error.code)];
        }

        // Check for specific error messages
        const errorStr = String(error.message).toUpperCase();

        if (errorStr.includes('TIMEOUT') || errorStr.includes('ETIMEDOUT')) {
            return this.userFriendlyMessages['TIMEOUT'];
        }

        if (errorStr.includes('NETWORK') || errorStr.includes('ECONNREFUSED')) {
            return this.userFriendlyMessages['NETWORK_ERROR'];
        }

        // Default message based on category
        switch (error.category) {
            case ErrorCategory.HTTP:
                return this.userFriendlyMessages['500'];
            case ErrorCategory.RUNTIME:
                return 'An application error occurred. Please refresh the page and try again.';
            default:
                return this.userFriendlyMessages['UNKNOWN_ERROR'];
        }
    }

    /**
     * Check if running in production
     */
    private isProduction(): boolean {
        try {
            // Check if environment exists and has production flag
            const env = (window as unknown as Record<string, unknown>)['__env'];
            return env ? (env as Record<string, boolean>)['production'] : false;
        } catch {
            return true; // Default to production behavior
        }
    }
}
