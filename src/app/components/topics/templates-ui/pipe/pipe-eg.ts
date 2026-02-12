import { Component } from '@angular/core';
import { VisibleIfDirective } from '../../../../directives/visible-if.directive';
import { ITopicContent } from '../../../../interfaces/topic';
import { TopicTemplate } from '../../../topic-template/topic-template';
import { PIPE } from './pipe-eg.const';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { CustomFilterPipe } from '../../../../pipes/custom-filter.pipe';

@Component({
    selector: 'app-directive',
    standalone: true,
    imports: [TopicTemplate, FormsModule, UpperCasePipe, DatePipe, CurrencyPipe, CustomFilterPipe],
    templateUrl: './pipe-eg.html',
    styleUrls: ['./pipe-eg.scss']
})
export class PipeExample {
    content: ITopicContent | any = PIPE;
    visible = false
    username = '';
    day = new Date();
    employees = [
        {
            id: 1,
            name: 'Rahul Sharma',
            department: 'IT',
            designation: 'Software Engineer',
            salary: 60000
        },
        {
            id: 2,
            name: 'Priya Das',
            department: 'HR',
            designation: 'HR Manager',
            salary: 55000
        },
        {
            id: 3,
            name: 'Amit Roy',
            department: 'Finance',
            designation: 'Accountant',
            salary: 50000
        },
        {
            id: 4,
            name: 'Sneha Gupta',
            department: 'Marketing',
            designation: 'Marketing Executive',
            salary: 52000
        }
    ];
    searchTerm = '';
    searchTermNorm = ''


}