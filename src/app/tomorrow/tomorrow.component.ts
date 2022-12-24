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

  public todos: TodoModel[] = [];

  ngOnInit(): void {
    this.afAuth.idToken.subscribe((token: any) => {
      this.todoService
        .getTomorrowTodos(token)
        .subscribe((data: TodoModel[]) => {
          this.todos = data;
        });
    });
  }
}
