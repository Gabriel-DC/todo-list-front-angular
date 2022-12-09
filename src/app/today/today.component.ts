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

  public isLoading = false;

  ngOnInit(): void {
    this.afAuth.idToken.subscribe((token: any) => {
      this.todoService.getTodayTodos(token).subscribe((data: TodoModel[]) => {
        console.log(token);
        console.log(data);
        this.todos = data;
      });
    });
  }

  markAsDone(todo: TodoModel) {
    this.afAuth.idToken.subscribe((token) => {
      const data = { id: todo.id };
      if (token)
        this.todoService.markAsDone(data, token).subscribe(
          (res) => {
            todo.done = true;
          },
          (err) => (todo.done = false)
        );
    });
  }

  markAsUndone(todo: TodoModel) {
    this.afAuth.idToken.subscribe((token) => {
      const data = { id: todo.id };
      if (token)
        this.todoService.markAsUndone(data, token).subscribe(
          (res) => {
            todo.done = false;
          },
          (err) => (todo.done = true)
        );
    });
  }

  onCheckChange(todo: TodoModel) {
    this.isLoading = true;
    console.log(todo.done);
    if (todo.done) this.markAsDone(todo);
    else this.markAsUndone(todo);
    this.isLoading = false;
  }
}
