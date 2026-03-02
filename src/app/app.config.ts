import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { ErrorHandlerService } from './core/services/error-handler.service';

/**
 * Application-wide configuration (Angular 21).
 * - Optimized change detection for better performance
 * - View transitions for smoother route changes
 * - Component input binding for route params/queryParams
 * - Preloading for faster subsequent navigation
 * - HTTP interceptors for auth, logging, and error handling
 * - Global error handler
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),

    provideHttpClient(withInterceptors([httpInterceptor])),
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
};
