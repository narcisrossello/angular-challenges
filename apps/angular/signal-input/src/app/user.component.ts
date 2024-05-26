import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

type Category = 'Youth' | 'Junior' | 'Open' | 'Senior';
const ageToCategory = (age: number): Category => {
  if (age < 10) return 'Youth';
  else if (age < 18) return 'Junior';
  else if (age < 35) return 'Open';
  return 'Senior';
};

export function convertAgeToNumber<T>(value: T): number {
  if (typeof value === 'string') {
    return +value;
  } else if (typeof value === 'number') {
    return value;
  } else {
    return 0;
  }
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    {{ fullName() | titlecase }} plays tennis in the {{ category() }} category!!
  `,
  host: {
    class: 'text-xl text-green-800',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  // @Input({ required: true }) name!: string;
  name = input.required<string>();
  // @Input() lastName?: string;
  lastName = input<string>();
  // @Input() age?: string;
  age = input(0, {
    transform: convertAgeToNumber<string>,
  });

  fullName = computed<string>(() => {
    return `${this.name()} ${this.lastName() ?? ''}`;
  });

  category = computed<string>(() => {
    return ageToCategory(this.age());
  });
}
