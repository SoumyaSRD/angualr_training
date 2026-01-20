import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-fundamentals',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    templateUrl: './angular-fundamentals.html',
    styleUrls: ['./angular-fundamentals.scss']
})
export class AngularFundamentalsComponent { }