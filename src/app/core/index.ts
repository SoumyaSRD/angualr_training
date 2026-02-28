/**
 * Core module - singleton services, guards, interceptors.
 * Import from '@app/core'.
 */

// Services
export { AuthService } from './services/auth.service';
export { ThemeService } from './services/theme.service';
export {
  NavigationService,
  type SubTopic,
  type Topic,
} from './services/navigation.service';
export { ToastService, type Toast, type ToastType } from './services/toast.service';
export { ModalService, type ModalOptions, type ModalRef } from './services/modal.service';
export { AlertService, type Alert, type AlertType } from './services/alert.service';
export { LoaderService, type LoaderState } from './services/loader.service';

// Layout Components
export { HeaderComponent } from './layout/header.component';
export { SidebarComponent } from './layout/sidebar.component';
export { FooterComponent } from './layout/footer.component';
export { LayoutComponent } from './layout/layout.component';

// Guards
export { authGuard } from './guards/auth.guard';

// Constants
export { ROUTE_PATHS } from './constants/route-paths';
