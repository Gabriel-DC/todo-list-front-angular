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
  ) {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrow = new Date(
      tomorrow.toLocaleDateString('en-US', {
        timeZone: 'America/Sao_Paulo',
      })
    )
      .toISOString()
      .split('T')[0];
  }

  public tomorrow!: string;

  // public todos: TodoModel[] = [];

  // ngOnInit(): void {
  //   this.afAuth.idToken.subscribe((token: any) => {
  //     this.todoService
  //       .getTomorrowTodos(token)
  //       .subscribe((data: TodoModel[]) => {
  //         this.todos = data;
  //       });
  //   });
  // }
}
