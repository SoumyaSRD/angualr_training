import { Component, computed, model, signal } from '@angular/core';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { ITopicContent } from '../../../../interfaces/topic';
import { ANGULAR_DATA_BINDING_GUIDE } from './data-binding.const';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-data-binding',
    standalone: true,
    imports: [TopicTemplate, FormsModule],
    templateUrl: './data-binding.html',
    styleUrl: './data-binding.scss'
})
export class DataBinding {
    content: ITopicContent | any = ANGULAR_DATA_BINDING_GUIDE;
    traditionalValue = 'Old way';

    // Signals
    signalValue = signal('New way');
    uppercaseSignal = computed(() => this.signalValue().toUpperCase());

    // Model Signal (Angular 17.3+)
    modelSignal = model('Two-way model');

    // Methods
    updateSignal(event: Event) {
        const input = event.target as HTMLInputElement;
        this.signalValue.set(input.value);
    }

    resetTraditional() {
        this.traditionalValue = 'Reset old';
    }

    resetSignal() {
        this.signalValue.set('Reset signal');
    }

    resetModel() {
        this.modelSignal.set('Reset model');
    }

}