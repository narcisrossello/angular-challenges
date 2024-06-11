import { TitleCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

enum DifficultyEnum {
  EASY = 'easy',
  NORMAL = 'normal',
}

type Difficulty = keyof typeof difficulty;
const difficulty = {
  easy: DifficultyEnum.EASY,
  normal: DifficultyEnum.NORMAL,
};

enum DirectionEnum {
  LEFT = 'left',
  RIGHT = 'right',
}

type Direction = 'left' | 'right';
type DirectionMap = { [key in Direction]: string };
const directions: DirectionMap = {
  left: 'left',
  right: 'right',
};

@Component({
  standalone: true,
  imports: [TitleCasePipe],
  selector: 'app-root',
  template: `
    <section>
      <div>
        <button
          mat-stroked-button
          (click)="difficulty.set(DifficultyEnum.EASY)">
          {{ DifficultyEnum.EASY | titlecase }}
        </button>
        <button
          mat-stroked-button
          (click)="difficulty.set(DifficultyEnum.NORMAL)">
          {{ DifficultyEnum.NORMAL | titlecase }}
        </button>
      </div>
      <p>Selected Difficulty: {{ difficultyLabel() }}</p>
    </section>

    <section>
      <div>
        <button mat-stroked-button (click)="direction.set(DirectionEnum.LEFT)">
          Left
        </button>
        <button mat-stroked-button (click)="direction.set(DirectionEnum.RIGHT)">
          Right
        </button>
      </div>
      <p>{{ directionLabel() }}</p>
    </section>
  `,
  styles: `
    section {
      @apply mx-auto my-5 flex w-fit flex-col items-center gap-2;

      > div {
        @apply flex w-fit gap-5;
      }
    }

    button {
      @apply rounded-md border px-4 py-2;
    }
  `,
})
export class AppComponent {
  readonly DifficultyEnum = DifficultyEnum;
  readonly DirectionEnum = DirectionEnum;

  readonly difficulty = signal<Difficulty>(DifficultyEnum.EASY);

  readonly direction = signal<Direction | undefined>(undefined);

  readonly difficultyLabel = computed<string>(
    () => difficulty[this.difficulty()],
  );

  readonly directionLabel = computed<string>(() =>
    this.direction()
      ? `You chose to go ${directions[this.direction()!]}`
      : 'Choose a direction!',
  );
}
