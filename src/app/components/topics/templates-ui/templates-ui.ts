import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-template-ui',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    templateUrl: './templates-ui.html',
    // styleUrls: ['./templates-ui.scss']
})
export class TemplateUi {

}