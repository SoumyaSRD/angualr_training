import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withViewTransitions,
  withComponentInputBinding,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { ErrorHandlerService } from './core/services/error-handler.service';

/**
 * Application-wide configuration (Angular 21).
 * - Zone coalescing for fewer change detection cycles
 * - View transitions for smoother route changes
 * - Component input binding for route params/queryParams
 * - Preloading for faster subsequent navigation
 * - HTTP interceptors for auth, logging, and error handling
 * - Global error handler
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([httpInterceptor])),
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
};
