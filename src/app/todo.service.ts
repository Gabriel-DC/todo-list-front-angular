import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoModel } from './models/todo';
import { ServerResponse } from './models/ServerResponse';

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
    return this.http.get<TodoModel[]>(`${this.baseUrl}/v1/todo/today`, {
      headers: this.composeHeaders(token),
    });
  }

  public getTomorrowTodos(token: string) {
    return this.http.get<TodoModel[]>(`${this.baseUrl}/v1/todo/tomorrow`, {
      headers: this.composeHeaders(token),
    });
  }

  public getAllTodos(token: string) {
    return this.http.get<TodoModel[]>(`${this.baseUrl}/v1/todo`, {
      headers: this.composeHeaders(token),
    });
  }

  public postTodo(data: { title: string; date: string | Date }, token: string) {
    return this.http.post<ServerResponse<TodoModel>>(
      `${this.baseUrl}/v1/todo`,
      data,
      {
        headers: this.composeHeaders(token),
      }
    );
  }

  public updateTodo(
    data: { todoId: string; title: string; date: string | Date },
    token: string
  ) {
    return this.http.put<ServerResponse<TodoModel>>(
      `${this.baseUrl}/v1/todo`,
      data,
      {
        headers: this.composeHeaders(token),
      }
    );
  }

  public markAsDone(data: { todoId: string }, token: string) {
    return this.http.patch<ServerResponse<TodoModel>>(
      `${this.baseUrl}/v1/todo/mark-as-done`,
      data,
      {
        headers: this.composeHeaders(token),
      }
    );
  }

  public markAsUndone(data: { todoId: string }, token: string) {
    return this.http.patch<ServerResponse<TodoModel>>(
      `${this.baseUrl}/v1/todo/mark-as-undone`,
      data,
      {
        headers: this.composeHeaders(token),
      }
    );
  }

  public deleteTodo(data: { id: string }, token: string) {
    return this.http.delete<ServerResponse<{}>>(
      `${this.baseUrl}/v1/todo/${data.id}`,
      {
        headers: this.composeHeaders(token),
      }
    );
  }
}
