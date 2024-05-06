import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personIndex',
  standalone: true,
  pure: true,
})
export class PersonIndexPipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
