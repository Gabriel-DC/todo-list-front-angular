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

  ngOnInit(): void {
    this.afAuth.idToken.subscribe((token: any) => {
      this.todoService.getTodayTodos(token).subscribe((data: TodoModel[]) => {
        console.log(token);
        console.log(data);
        this.todos = data;
      });
    });
  }

  onCheckChange(todo: TodoModel) {
    //TO DO
    // JOKES LMAO
  }
}
