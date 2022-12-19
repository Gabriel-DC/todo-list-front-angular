import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TodoModel } from '../models/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private afAuth: AngularFireAuth
  ) {}

  public todos: TodoModel[] = [];
  public isCreating = false;

  ngOnInit(): void {
    this.afAuth.idToken.subscribe((token: string | null) => {
      if (token)
        this.todoService.getTodayTodos(token).subscribe((data: TodoModel[]) => {
          console.log(token);
          console.log(data);
          this.todos = data;
        });
    });
  }

  deleteTodo(todo: TodoModel) {
    if (!todo.id) {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
      this.isCreating = false;
      return;
    }

    this.afAuth.idToken.subscribe((token: string | null) => {
      if (token)
        this.todoService.deleteTodo({ id: todo.id }, token).subscribe(() => {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        });
    });
  }

  newTodo() {
    this.isCreating = true;
    console.log('new todo');
    this.todos.push({
      id: '',
      title: '',
      date: new Date(
        new Date().toLocaleDateString('en-US', {
          timeZone: 'America/Sao_Paulo',
        })
      ),
      done: false,
    });
    console.log(this.todos);
  }

  updateTodo(todo: TodoModel) {
    this.isCreating = false;
    this.todos = this.todos.filter((t) => t.id);
    this.todos.push(todo);
  }
}
