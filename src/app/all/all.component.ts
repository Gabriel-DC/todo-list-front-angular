import { TodoListComponent } from './../components/todo-list/todo-list.component';
import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TodoModel } from '../models/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent {
  constructor(
    private todoService: TodoService,
    private afAuth: AngularFireAuth
  ) {}

  @ViewChild('todoList') todoListComponent!: TodoListComponent;

  public startDate!: string;
  public endDate!: string;

  filter() {
    this.afAuth.idToken.subscribe((token: any) => {
      if (token) {
        this.todoService
          .getAllTodosByPeriod(token, {
            startDate: this.startDate.split('T')[0],
            endDate: this.endDate.split('T')[0],
          })
          .subscribe((data: TodoModel[]) => {
            this.todoListComponent.todos = data;
          });
      }
    });
  }
}
