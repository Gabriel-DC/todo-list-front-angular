import { Component } from '@angular/core';
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

  public todos: TodoModel[] = [];

  public startDate!: string;
  public endDate!: string;

  ngOnInit(): void {
    // this.afAuth.idToken.subscribe((token: any) => {
    //   this.todoService.getAllTodos(token).subscribe((data: TodoModel[]) => {
    //     this.todos = data;
    //     this.startDate = this.todos[0]?.date?.toString();
    //     this.endDate = this.todos[this.todos.length - 1].date?.toString();
    //   });
    // });
  }

  filter() {
    console.log(this.startDate, this.endDate);
    this.afAuth.idToken.subscribe((token: any) => {
      if (token) {
        this.todoService
          .getAllTodosByPeriod(token, {
            startDate: this.startDate.split('T')[0],
            endDate: this.endDate.split('T')[0],
          })
          .subscribe((data: TodoModel[]) => {
            this.todos = data;
          });
      }
    });
  }
}
