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

// Guards
export { authGuard } from './guards/auth.guard';

// Constants
export { ROUTE_PATHS } from './constants/route-paths';
