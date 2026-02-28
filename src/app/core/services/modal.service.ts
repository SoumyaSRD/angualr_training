import {
    Injectable,
    ComponentRef,
    ApplicationRef,
    EnvironmentInjector,
    createComponent,
    Type,
    signal,
    computed,
} from '@angular/core';

export interface ModalOptions {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    backdrop?: boolean | 'static';
    keyboard?: boolean;
    centered?: boolean;
    scrollable?: boolean;
}

export interface ModalRef<T = unknown> {
    close: (result?: T) => void;
    dismiss: () => void;
    afterClosed: () => Promise<T | undefined>;
}

interface ActiveModal<R = unknown> {
    id: string;
    componentRef: ComponentRef<unknown>;
    resolve: (value: R | undefined) => void;
    reject: () => void;
}

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private readonly activeModalsSignal = signal<ActiveModal<unknown>[]>([]);
    readonly hasOpenModals = computed(() => this.activeModalsSignal().length > 0);

    constructor(
        private readonly appRef: ApplicationRef,
        private readonly injector: EnvironmentInjector
    ) { }

    open<T, R = unknown>(
        component: Type<T>,
        options: ModalOptions = {}
    ): ModalRef<R> {
        const id = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const mergedOptions: ModalOptions = {
            size: 'md',
            backdrop: true,
            keyboard: true,
            centered: false,
            scrollable: false,
            ...options,
        };

        // Create modal container element
        const container = document.createElement('div');
        container.className = 'modal fade';
        container.setAttribute('tabindex', '-1');
        container.setAttribute('aria-hidden', 'true');
        container.id = id;

        if (mergedOptions.backdrop === 'static') {
            container.setAttribute('data-bs-backdrop', 'static');
        } else if (mergedOptions.backdrop === false) {
            container.setAttribute('data-bs-backdrop', 'false');
        }

        if (mergedOptions.keyboard === false) {
            container.setAttribute('data-bs-keyboard', 'false');
        }

        // Create modal dialog
        const dialog = document.createElement('div');
        dialog.className = `modal-dialog modal-${mergedOptions.size}`;
        if (mergedOptions.centered) {
            dialog.classList.add('modal-dialog-centered');
        }
        if (mergedOptions.scrollable) {
            dialog.classList.add('modal-dialog-scrollable');
        }

        // Create modal content container
        const content = document.createElement('div');
        content.className = 'modal-content';

        dialog.appendChild(content);
        container.appendChild(dialog);
        document.body.appendChild(container);

        // Create the component
        const componentRef = createComponent(component, {
            environmentInjector: this.injector,
            hostElement: content,
        });

        // Attach to application
        this.appRef.attachView(componentRef.hostView);

        let resolveFn: (value: R | undefined) => void;
        let rejectFn: () => void;

        const promise = new Promise<R | undefined>((resolve, reject) => {
            resolveFn = resolve;
            rejectFn = reject;
        });

        const activeModal: ActiveModal<unknown> = {
            id,
            componentRef,
            resolve: resolveFn! as (value: unknown) => void,
            reject: rejectFn!,
        };

        this.activeModalsSignal.update((modals) => [...modals, activeModal]);

        // Show the modal using Bootstrap
        container.classList.add('show');
        container.style.display = 'block';
        document.body.classList.add('modal-open');

        // Add backdrop if enabled
        if (mergedOptions.backdrop !== false) {
            const backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop fade show';
            backdrop.id = `${id}-backdrop`;
            document.body.appendChild(backdrop);
        }

        // Handle escape key
        if (mergedOptions.keyboard !== false) {
            const escapeHandler = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    this.closeModal(id, undefined);
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        }

        // Handle backdrop click
        if (mergedOptions.backdrop !== 'static') {
            container.addEventListener('click', (event) => {
                if (event.target === container) {
                    this.closeModal(id, undefined);
                }
            });
        }

        return {
            close: (result?: R) => this.closeModal(id, result),
            dismiss: () => this.closeModal(id, undefined),
            afterClosed: () => promise,
        };
    }

    private closeModal<T>(id: string, result?: T): void {
        const modal = this.activeModalsSignal().find((m) => m.id === id);
        if (!modal) return;

        const container = document.getElementById(id);
        const backdrop = document.getElementById(`${id}-backdrop`);

        // Hide modal
        if (container) {
            container.classList.remove('show');
            setTimeout(() => {
                container.remove();
            }, 150);
        }

        // Remove backdrop
        if (backdrop) {
            backdrop.remove();
        }

        // Detach component
        this.appRef.detachView(modal.componentRef.hostView);
        modal.componentRef.destroy();

        // Resolve promise
        modal.resolve(result);

        // Remove from active modals
        this.activeModalsSignal.update((modals) =>
            modals.filter((m) => m.id !== id)
        );

        // Remove modal-open class if no more modals
        if (this.activeModalsSignal().length === 0) {
            document.body.classList.remove('modal-open');
        }
    }

    closeAll(): void {
        const modals = [...this.activeModalsSignal()];
        modals.forEach((modal) => this.closeModal(modal.id, undefined));
    }
}
