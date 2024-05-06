import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PersonIndexPipe } from './pipes/person-index.pipe';

@Component({
  standalone: true,
  imports: [NgFor, PersonIndexPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      <!-- {{ heavyComputation(person, index) }} -->
      {{ person | personIndex: index }}
    </div>
  `,
})
export class AppComponent {
  persons = [
    'toto',
    'jack',
    'emma',
    'liam',
    'sophia',
    'noah',
    'olivia',
    'william',
    'ava',
    'james',
    'isabella',
    'michael',
    'amelia',
    'benjamin',
    'mia',
    'alexander',
    'charlotte',
    'daniel',
    'harper',
    'matthew',
  ];

  // heavyComputation(name: string, index: number) {
  //   // very heavy computation
  //   return `${name} - ${index}`;
  // }
}
