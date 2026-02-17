import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withViewTransitions,
  withComponentInputBinding,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

/**
 * Application-wide configuration (Angular 21).
 * - Zone coalescing for fewer change detection cycles
 * - View transitions for smoother route changes
 * - Component input binding for route params/queryParams
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withComponentInputBinding()
    ),
    provideAnimationsAsync(),
  ],
};
