import { Component } from '@angular/core';
import { ICodeExample } from '../../../interfaces/code-example';
import { TopicTemplateComponent } from '../../topic-template/topic-template.component';

@Component({
  selector: 'app-standalone-components',
  standalone: true,
  imports: [TopicTemplateComponent],
  templateUrl: './standalone-components.component.html',
  styleUrl: './standalone-components.component.scss'
})
export class StandaloneComponentsComponent {
  title = 'Standalone Components (Angular 17+)';
  tags = ['Modern Angular', 'Components', 'Architecture'];

  codeExamples: ICodeExample[] = [
    {
      title: 'Standalone Component Example',
      language: 'TypeScript',
      description: 'A complete standalone component with imports',
      code: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule
  ],
  template: \`
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ user.name }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Email: {{ user.email }}</p>
        <input [(ngModel)]="user.name" />
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="save()">Save</button>
      </mat-card-actions>
    </mat-card>
  \`
})
export class UserCardComponent {
  user = {
    name: 'John Doe',
    email: 'john@example.com'
  };

  save() {
    console.log('Saving user:', this.user);
  }
}`
    },
    {
      title: 'Bootstrapping Standalone App',
      language: 'TypeScript',
      description: 'Modern way to bootstrap Angular applications',
      code: `import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient()
  ]
}).catch(err => console.error(err));`
    },
    {
      title: 'NgModule vs Standalone Comparison',
      language: 'TypeScript',
      description: 'Traditional vs modern approach',
      code: `@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductComponent { }

@Component({
  selector: 'app-product-old',
  standalone: false
})
export class ProductOldComponent { }

@NgModule({
  declarations: [ProductOldComponent],
  imports: [CommonModule, FormsModule]
})
export class ProductModule { }`
    }
  ];

  keyPoints = [
    'Standalone components eliminate the need for NgModules',
    'Each component explicitly declares its dependencies in the imports array',
    'Reduces boilerplate and simplifies application structure',
    'Better tree-shaking and smaller bundle sizes',
    'Recommended approach for all new Angular applications',
    'Existing apps can gradually migrate using Angular schematics',
    'Can coexist with NgModule-based components during migration'
  ];
}
