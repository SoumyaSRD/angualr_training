import { Injectable, signal, computed } from '@angular/core';

export interface LoaderState {
    isLoading: boolean;
    message?: string;
    progress?: number;
}

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    private readonly loaderSignal = signal<LoaderState>({ isLoading: false });
    readonly state = computed(() => this.loaderSignal());
    readonly isLoading = computed(() => this.loaderSignal().isLoading);

    show(message?: string): void {
        this.loaderSignal.set({ isLoading: true, message });
    }

    hide(): void {
        this.loaderSignal.set({ isLoading: false });
    }

    updateProgress(progress: number): void {
        this.loaderSignal.update((state) => ({
            ...state,
            progress: Math.min(100, Math.max(0, progress)),
        }));
    }

    withLoader<T>(promise: Promise<T>, message?: string): Promise<T> {
        this.show(message);
        return promise.finally(() => this.hide());
    }

    async withLoaderAsync<T>(
        fn: () => Promise<T>,
        message?: string
    ): Promise<T> {
        this.show(message);
        try {
            return await fn();
        } finally {
            this.hide();
        }
    }
}
