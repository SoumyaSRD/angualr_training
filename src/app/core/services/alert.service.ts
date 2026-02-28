import { Injectable, signal, computed } from '@angular/core';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
    id: string;
    message: string;
    type: AlertType;
    dismissible: boolean;
    autoClose: boolean;
    autoCloseDelay: number;
}

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private readonly alertsSignal = signal<Alert[]>([]);
    readonly alerts = computed(() => this.alertsSignal());

    private generateId(): string {
        return `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    show(
        message: string,
        type: AlertType = 'info',
        options: {
            dismissible?: boolean;
            autoClose?: boolean;
            autoCloseDelay?: number;
        } = {}
    ): string {
        const id = this.generateId();
        const alert: Alert = {
            id,
            message,
            type,
            dismissible: options.dismissible ?? true,
            autoClose: options.autoClose ?? true,
            autoCloseDelay: options.autoCloseDelay ?? 5000,
        };

        this.alertsSignal.update((alerts) => [...alerts, alert]);

        if (alert.autoClose && alert.autoCloseDelay > 0) {
            setTimeout(() => this.dismiss(id), alert.autoCloseDelay);
        }

        return id;
    }

    success(
        message: string,
        options?: Omit<Parameters<typeof this.show>[2], 'type'>
    ): string {
        return this.show(message, 'success', options);
    }

    error(
        message: string,
        options?: Omit<Parameters<typeof this.show>[2], 'type'>
    ): string {
        return this.show(message, 'error', { ...options, autoClose: false });
    }

    warning(
        message: string,
        options?: Omit<Parameters<typeof this.show>[2], 'type'>
    ): string {
        return this.show(message, 'warning', options);
    }

    info(
        message: string,
        options?: Omit<Parameters<typeof this.show>[2], 'type'>
    ): string {
        return this.show(message, 'info', options);
    }

    dismiss(id: string): void {
        this.alertsSignal.update((alerts) =>
            alerts.filter((alert) => alert.id !== id)
        );
    }

    dismissAll(): void {
        this.alertsSignal.set([]);
    }
}
