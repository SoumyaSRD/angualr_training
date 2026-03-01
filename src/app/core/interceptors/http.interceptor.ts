import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';

/**
 * HTTP Interceptor for enterprise application
 * - Adds auth token to requests
 * - Shows/hides loader
 * - Logs requests in dev mode
 * - Handles errors globally
 */
export const httpInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const logger = inject(LoggerService);
    const loader = inject(LoaderService);
    const toast = inject(ToastService);
    const auth = inject(AuthService);

    // Skip loader for certain requests
    const skipLoader = req.headers.has('X-Skip-Loader');

    // Clone request to add headers
    let modifiedReq = req;

    // Add auth token if available
    const token = auth.getToken();
    if (token) {
        modifiedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
    }

    // Add content type if not present
    if (!modifiedReq.headers.has('Content-Type')) {
        modifiedReq = modifiedReq.clone({
            headers: modifiedReq.headers.set('Content-Type', 'application/json'),
        });
    }

    // Show loader
    if (!skipLoader) {
        loader.show();
    }

    // Log request in development
    logger.debug(`HTTP ${req.method}`, { url: req.url, body: req.body }, 'HTTP');

    const startTime = performance.now();

    return next(modifiedReq).pipe(
        tap((event) => {
            const duration = performance.now() - startTime;
            logger.debug(`HTTP ${req.method} completed`, {
                url: req.url,
                duration: `${duration.toFixed(2)}ms`
            }, 'HTTP');
        }),
        catchError((error: HttpErrorResponse) => {
            const duration = performance.now() - startTime;

            logger.error(
                `HTTP ${req.method} failed`,
                { url: req.url, status: error.status, error: error.error, duration: `${duration.toFixed(2)}ms` },
                'HTTP'
            );

            // Handle specific error cases
            if (error.status === 401) {
                // Token expired or invalid
                auth.logout();
                toast.show('Your session has expired. Please sign in again.', 'warning', 5000);
            } else if (error.status === 403) {
                toast.show('You do not have permission to perform this action.', 'error', 5000);
            } else if (error.status === 0) {
                // Network error
                toast.show('Network error. Please check your connection.', 'error', 5000);
            }

            return throwError(() => error);
        }),
        finalize(() => {
            if (!skipLoader) {
                loader.hide();
            }
        })
    );
};
