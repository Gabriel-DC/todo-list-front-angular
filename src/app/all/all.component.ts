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

  ngOnInit(): void {
    this.afAuth.idToken.subscribe((token: any) => {
      this.todoService.getAllTodos(token).subscribe((data: TodoModel[]) => {
        this.todos = data;
      });
    });
  }
}
