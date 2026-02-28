import { Injectable, signal, computed } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration: number;
    dismissible: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private readonly toastsSignal = signal<Toast[]>([]);
    readonly toasts = computed(() => this.toastsSignal());

    private generateId(): string {
        return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    show(
        message: string,
        type: ToastType = 'info',
        duration: number = 3000,
        dismissible: boolean = true
    ): string {
        const id = this.generateId();
        const toast: Toast = {
            id,
            message,
            type,
            duration,
            dismissible,
        };

        this.toastsSignal.update((toasts) => [...toasts, toast]);

        if (duration > 0) {
            setTimeout(() => this.dismiss(id), duration);
        }

        return id;
    }

    success(message: string, duration?: number): string {
        return this.show(message, 'success', duration);
    }

    error(message: string, duration?: number): string {
        return this.show(message, 'error', duration);
    }

    warning(message: string, duration?: number): string {
        return this.show(message, 'warning', duration);
    }

    info(message: string, duration?: number): string {
        return this.show(message, 'info', duration);
    }

    dismiss(id: string): void {
        this.toastsSignal.update((toasts) =>
            toasts.filter((toast) => toast.id !== id)
        );
    }

    dismissAll(): void {
        this.toastsSignal.set([]);
    }
}
