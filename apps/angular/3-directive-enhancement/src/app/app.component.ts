import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmpty } from './ngfor-empty.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgFor, NgForEmpty],
  selector: 'app-root',
  template: `
    <!-- <ng-container *ngIf="persons.length > 0; else emptyList"> -->
    <div *ngFor="let person of persons; empty: emptyList">
      {{ person.name }}
    </div>
    <!-- </ng-container> -->
    <ng-template #emptyList>The list is empty !!</ng-template>
    <div style="padding-top: 10px;">
      <button (click)="add()">Add</button>
      <button (click)="clear()">Clear</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];

  clear(): void {
    this.persons = [];
  }

  add(): void {
    this.persons.push({ name: 'John Doe' });
  }
}
