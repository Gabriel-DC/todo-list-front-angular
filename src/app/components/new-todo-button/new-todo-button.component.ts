import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-todo-button',
  templateUrl: './new-todo-button.component.html',
  styleUrls: ['./new-todo-button.component.css'],
})
export class NewTodoButtonComponent {
  constructor() {}

  @Output() public newTodoEvent = new EventEmitter();

  addTodo() {
    console.log('new todo');
    this.newTodoEvent.emit();
  }
}
