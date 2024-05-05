import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { TodoModel } from '../models/todo-model.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  //OLD WAY TO MANAGE COMMON DATA THROUGH APPLICATION
  // private todosSubject: BehaviorSubject<TodoModel[]> = new BehaviorSubject<
  //   TodoModel[]
  // >([]);
  // todos$: Observable<TodoModel[]> = this.todosSubject.asObservable();

  #todos = signal<TodoModel[]>([]);
  todos = computed(this.#todos);

  constructor(private http: HttpClient) {}

  getTodos(): void {
    this.http
      .get<TodoModel[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.#todos.set(todos);
      });
  }

  update(todo: TodoModel) {
    this.http
      .put<TodoModel>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: TodoModel) => {
        this.#todos.update((todos) =>
          todos.map((todo) =>
            todo.id === todoUpdated.id ? todoUpdated : todo,
          ),
        );
      });
  }
}
