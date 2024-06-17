import {
  injectDestroyService,
  provideDestroyService,
} from '@angular-challenges/shared/utils';
import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasRole], [hasRoleIsAdmin]',
  standalone: true,
  providers: [provideDestroyService()],
})
export class HasRoleDirective implements OnInit {
  private destroy$ = injectDestroyService();

  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  private store = inject(UserStore);

  @Input('hasRole') role: Role | Role[] | undefined = undefined;

  @Input('hasRoleIsAdmin') isAdmin = false;

  ngOnInit(): void {
    if (this.isAdmin) {
      this.store.isAdmin$
        .pipe(takeUntil(this.destroy$))
        .subscribe((isAdmin) =>
          isAdmin ? this.addTemplate() : this.clearTemplate(),
        );
    } else if (this.role) {
      this.store
        .hasAnyRole(this.role)
        .pipe(takeUntil(this.destroy$))
        .subscribe((hasPermission) =>
          hasPermission ? this.addTemplate() : this.clearTemplate(),
        );
    } else {
      this.addTemplate();
    }
  }

  addTemplate(): void {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  clearTemplate(): void {
    this.viewContainer.clear();
  }
}
