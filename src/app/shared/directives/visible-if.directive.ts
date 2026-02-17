import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { AuthService } from '@app/core';

@Directive({
  selector: '[appVisibleIf]',
  standalone: true,
})
export class VisibleIfDirective {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);
  private hasView = false;

  @Input()
  set appVisibleIf(condition: boolean | string | null | undefined) {
    const isVisible =
      typeof condition === 'string'
        ? this.authService.hasRole(condition)
        : !!condition;
    if (isVisible && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isVisible && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
