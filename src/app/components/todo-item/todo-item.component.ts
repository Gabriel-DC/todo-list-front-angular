import { ModalComponent } from './../modal/modal.component';
import { TodoModel } from './../../models/todo';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private afAuth: AngularFireAuth
  ) {}
  ngOnInit(): void {
    this.editedTodo = { ...this.todo };
    if (!this.todo.id) this.isInEditMode = true;
  }

  public isInEditMode = false;
  @Input() public todo!: TodoModel;
  public editedTodo!: TodoModel;

  @Output() public deleteEvent = new EventEmitter();
  public isLoading = false;

  markAsDone(todo: TodoModel) {
    this.afAuth.idToken.subscribe({
      next: (token) => {
        const data = { todoId: todo.id };
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
          const data = { todoId: todo.id };
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

  deleteTodo(todo: TodoModel, modal: ModalComponent) {
    this.deleteEvent.emit(todo);
    modal.toggle();
  }

  onEditTodo() {
    console.log(this.editedTodo);
    console.log(this.todo);
  }

  onCancelEdit() {
    debugger;
    if (!this.todo.id) this.deleteEvent.emit(this.todo);

    this.isInEditMode = false;
    this.editedTodo = { ...this.todo };
  }

  // chama(todo: TodoModel) {
  //   alert('Deleta o ' + todo.title);
  // }
}
