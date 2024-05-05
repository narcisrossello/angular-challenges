import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-title',
  standalone: true,
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title | titlecase }}
    </h1>
  `,
  imports: [CDFlashingDirective, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonTitleComponent {
  @Input({ required: true }) title!: string;
}
