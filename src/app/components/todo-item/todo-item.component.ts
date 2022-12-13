import { TodoModel } from './../../models/todo';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  constructor(
    private todoService: TodoService,
    private afAuth: AngularFireAuth
  ) {}

  @Input() public todo!: TodoModel;

  @Output() public deleteEvent = new EventEmitter();
  public isLoading = false;

  markAsDone(todo: TodoModel) {
    this.afAuth.idToken.subscribe({
      next: (token) => {
        const data = { id: todo.id };
        if (token)
          this.todoService.markAsDone(data, token).subscribe({
            next: () => {
              todo.done = true;
              this.isLoading = false;
            },
            error: () => {
              todo.done = false;
              this.isLoading = false;
            },
          });
      },
      error: () => {
        todo.done = false;
        this.isLoading = false;
      },
    });
  }

  markAsUndone(todo: TodoModel) {
    this.afAuth.idToken.subscribe({
      next: (token) => {
        if (token) {
          const data = { id: todo.id };
          this.todoService.markAsUndone(data, token).subscribe({
            next: () => {
              todo.done = false;
              this.isLoading = false;
            },
            error: () => {
              todo.done = true;
              this.isLoading = false;
            },
          });
        } else this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onCheckChange(todo: TodoModel) {
    this.isLoading = true;
    console.log(todo.done);
    if (todo.done) this.markAsDone(todo);
    else this.markAsUndone(todo);
  }

  deleteTodo(todo: TodoModel) {
    //TO DO
    //JOKES Lmao
    this.deleteEvent.emit(todo);
  }
}
