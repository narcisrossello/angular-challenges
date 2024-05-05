import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { TodoModel } from '../models/todo-model.interface';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <!-- {{this.todoService.todosSignal()}} -->
    <div *ngFor="let todo of this.todos()">
      {{ todo.id }} {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos: Signal<TodoModel[]> = this.todoService.todos;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos();
  }

  update(todo: TodoModel) {
    this.todoService.update(todo);
  }
}
