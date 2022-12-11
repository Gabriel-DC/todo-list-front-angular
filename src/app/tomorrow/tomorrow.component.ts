import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TodoModel } from '../models/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-tomorrow',
  templateUrl: './tomorrow.component.html',
  styleUrls: ['./tomorrow.component.css'],
})
export class TomorrowComponent {
  constructor(
    private todoService: TodoService,
    private afAuth: AngularFireAuth
  ) {}

  public todos: TodoModel[] = [
    {
      id: 'batata',
      date: new Date(2022, 12, 7, 8, 0, 0),
      done: false,
      title: 'Acordar',
      user: 'seinão',
    },
    {
      id: 'batata3',
      date: new Date(2022, 12, 7),
      done: false,
      title: 'Marcar reunião com empresa X',
      user: 'seinão',
    },
    {
      id: 'batata2',
      date: new Date(2022, 12, 7, 22, 17, 12),
      done: false,
      title: 'Tomar café',
      user: 'seinão',
    },
  ];

  ngOnInit(): void {
    this.afAuth.idToken.subscribe((token: any) => {
      this.todoService
        .getTomorrowTodos(token)
        .subscribe((data: TodoModel[]) => {
          console.log(token);
          console.log(data);
          this.todos = data;
        });
    });
  }
}
