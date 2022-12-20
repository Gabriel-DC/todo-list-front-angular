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
  }

  updateTodo(todo: TodoModel) {
    this.isCreating = false;
    this.todos = this.todos.filter((t) => t.id);
    this.todos.push(todo);
  }
}
