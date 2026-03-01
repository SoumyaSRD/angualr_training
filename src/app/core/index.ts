/**
 * Core module - singleton services, guards, interceptors.
 * Import from '@app/core'.
 */

// Services
export { AuthService } from './services/auth.service';
export { ThemeService, type Theme, type ThemeConfig } from './services/theme.service';
export {
  NavigationService,
  type SubTopic,
  type Topic,
} from './services/navigation.service';
export { ToastService, type Toast, type ToastType } from './services/toast.service';
export { ModalService, type ModalOptions, type ModalRef } from './services/modal.service';
export { AlertService, type Alert, type AlertType } from './services/alert.service';
export { LoaderService, type LoaderState } from './services/loader.service';
export { LoggerService, LogLevel, type LogEntry } from './services/logger.service';
export { ErrorHandlerService, ErrorCategory, type AppError } from './services/error-handler.service';
export { LayoutService, type BreadcrumbItem, type PageMeta } from './services/layout.service';

// Interceptors
export { httpInterceptor } from './interceptors/http.interceptor';

// Layout Components
export { HeaderComponent as HeaderComponent } from './layout/header.component';
export { SidebarComponent } from './layout/sidebar.component';
export { FooterComponent } from './layout/footer.component';
export { LayoutComponent } from './layout/layout.component';

// Guards
export {
  authGuard,
  roleGuard,
  anonymousGuard,
  type AuthRouteData
} from './guards/auth.guard';

// Constants
export { ROUTE_PATHS } from './constants/route-paths';
