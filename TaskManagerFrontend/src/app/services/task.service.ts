import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskItem {
  id: number;
  title: string;
  priority: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5176/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  addTask(task: Omit<TaskItem, 'id' | 'completed'>): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task);
  }

  completeTask(id: number): Observable<TaskItem> {
    return this.http.put<TaskItem>(`${this.apiUrl}/${id}`, {});
  }
}
