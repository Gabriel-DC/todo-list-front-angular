import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
import { TodoModel } from 'src/app/models/todo';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements AfterViewInit {
  constructor(
    private todoService: TodoService,
    private afAuth: AngularFireAuth
  ) {}

  public todos: TodoModel[] = [];
  public isCreating = false;
  public isLoading = true;
  @Input() public date!: string | Date;
  @Output() public updateDateEvent = new EventEmitter();

  ngAfterViewInit(): void {
    this.loaderComponent();
  }

  async loaderComponent() {
    let token = await firstValueFrom(this.afAuth.idToken);

    if (token)
      if (this.date)
        this.todoService
          .getAllTodosByDate(token, this.date.toString())
          .subscribe((data: TodoModel[]) => {
            this.todos = data;
            this.isLoading = false;
          });
      else
        this.todoService.getAllTodos(token).subscribe((data: TodoModel[]) => {
          this.todos = data;
          this.updateDateEvent.emit({
            start: data[0]?.date,
            end: data[data.length - 1]?.date,
          });
          this.isLoading = false;
        });
  }

  async reload(fastReload = false) {
    if (fastReload) {
      if (this.date)
        this.todos = this.todos
          .filter((t) => t.date.toString().split('T')[0] == this.date)
          .sort((a, b) => (a.date > b.date ? 1 : -1));
      else
        this.todos = this.todos.sort((a, b) => {
          return a.date > b.date ? 1 : -1;
        });

      return;
    }

    let token = await firstValueFrom(this.afAuth.idToken);

    if (token)
      if (this.date)
        this.todoService
          .getAllTodosByDate(token, this.date.toString())
          .subscribe((data: TodoModel[]) => {
            this.todos = data;
          });
      else
        this.todoService.getAllTodos(token).subscribe((data: TodoModel[]) => {
          this.todos = data;
        });
  }

  async deleteTodo(todo: TodoModel) {
    if (!todo.id) {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
      this.isCreating = false;
      return;
    }

    let token = await firstValueFrom(this.afAuth.idToken);

    if (token)
      this.todoService.deleteTodo({ id: todo.id }, token).subscribe(() => {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
      });
  }

  newTodo() {
    this.isCreating = true;
    const date = new Date(this.date ? this.date.toString() : new Date());

    this.todos.push({
      id: '',
      title: '',
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      done: false,
    });
  }

  updateTodo(todo: TodoModel) {
    this.isCreating = false;
    this.todos = this.todos.filter((t) => t.id);
    this.todos.push(todo);
    this.reload(true);
  }
}
