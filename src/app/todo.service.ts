import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoModel } from './models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public baseUrl = 'https://localhost:7213';

  constructor(private http: HttpClient) {}

  public composeHeaders(token: string) {
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return headers;
    }

    return new HttpHeaders();
  }

  public getTodayTodos(token: string) {
    debugger;
    let date: string = new Date(
      new Date().toLocaleDateString('en-US', { timeZone: 'America/Sao_Paulo' })
    )
      .toISOString()
      .split('T')[0];

    return this.http.get<TodoModel[]>(`${this.baseUrl}/v1/todo/date/${date}`, {
      headers: this.composeHeaders(token),
    });
  }

  public getTomorrowTodos(token: string) {
    return this.http.get(`${this.baseUrl}/v1/todos/undone/tomorrow`, {
      headers: this.composeHeaders(token),
    });
  }

  public getAllTodos(token: string) {
    return this.http.get(`${this.baseUrl}/v1/todos`, {
      headers: this.composeHeaders(token),
    });
  }

  public postTodo(data: any, token: string) {
    return this.http.post(`${this.baseUrl}/v1/todos`, data, {
      headers: this.composeHeaders(token),
    });
  }

  public markAsDone(data: { id: any }, token: string) {
    return this.http.put(`${this.baseUrl}/v1/todos/mark-as-done`, data, {
      headers: this.composeHeaders(token),
    });
  }
}
