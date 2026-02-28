import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ModalService } from '@app/core';

export interface ConfirmationModalData {
    title?: string;
    message: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonClass?: string;
    icon?: string;
}

@Component({
    selector: 'app-confirmation-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="modal-header">
      <h5 class="modal-title d-flex align-items-center gap-2">
        @if (data().icon) {
          <i class="bi" [class]="data().icon"></i>
        }
        {{ data().title || 'Confirm' }}
      </h5>
      <button type="button" class="btn-close" (click)="dismiss()" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <p class="mb-0">{{ data().message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="dismiss()">
        {{ data().cancelButtonText || 'Cancel' }}
      </button>
      <button 
        type="button" 
        [class]="'btn ' + (data().confirmButtonClass || 'btn-primary')"
        (click)="confirm()"
      >
        {{ data().confirmButtonText || 'Confirm' }}
      </button>
    </div>
  `,
})
export class ConfirmationModalComponent {
    private modalService = inject(ModalService);
    readonly data = signal<ConfirmationModalData>({
        message: '',
    });

    setData(data: ConfirmationModalData): void {
        this.data.set(data);
    }

    confirm(): void {
        this.modalService.closeAll();
    }

    dismiss(): void {
        this.modalService.closeAll();
    }
}
