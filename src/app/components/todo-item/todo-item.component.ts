import { ModalComponent } from './../modal/modal.component';
import { TodoModel } from './../../models/todo';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
    if (!this.todo.id) this.startEdit();
  }

  @ViewChild('titleInput', { static: false }) input!: ElementRef;
  public isInEditMode = false;
  @Input() public todo!: TodoModel;
  public editedTodo!: TodoModel;

  @Output() public deleteEvent = new EventEmitter();
  @Output() public createEvent = new EventEmitter();
  @Output() public reloadEvent = new EventEmitter();
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
    if (todo.done) this.markAsDone(todo);
    else this.markAsUndone(todo);
  }

  deleteTodo(todo: TodoModel, modal: ModalComponent) {
    this.deleteEvent.emit(todo);
    modal.toggle();
  }

  onEditTodo() {
    let title = this.editedTodo.title.trim();
    let date = new Date(this.editedTodo.date).toISOString();
    let isNew = !this.todo.id;

    if (title && date) {
      if (isNew) {
        this.afAuth.idToken.subscribe((token) => {
          if (token) {
            this.todoService
              .postTodo({ title: title, date: date }, token)
              .subscribe({
                next: (res) => {
                  this.createEvent.emit(res.data);
                  this.todo = res.data;
                  this.editedTodo = res.data;
                  this.isInEditMode = false;
                },
              });
          }
        });
        return;
      }

      this.afAuth.idToken.subscribe((token) => {
        if (token) {
          this.todoService
            .updateTodo(
              {
                todoId: this.editedTodo.id,
                title: this.editedTodo.title,
                date: date,
              },
              token
            )
            .subscribe({
              next: (res) => {
                this.todo = res.data;
                this.isInEditMode = false;
                this.reloadEvent.emit();
              },
            });
        }
      });
    }
  }

  onCancelEdit() {
    if (!this.todo.id) this.deleteEvent.emit(this.todo);

    this.isInEditMode = false;
    this.editedTodo = { ...this.todo };
  }

  startEdit() {
    this.isInEditMode = true;
    setTimeout(() => {
      this.input.nativeElement.focus();
    });
  }
}
