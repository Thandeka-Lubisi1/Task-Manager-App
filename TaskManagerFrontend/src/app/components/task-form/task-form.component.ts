import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, TaskItem } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-form-container">
      <h3>Add New Task</h3>
      <form (ngSubmit)="onSubmit()" #taskForm="ngForm">
        <div class="form-group">
          <label for="title">Task Title *</label>
          <input 
            type="text" 
            id="title" 
            name="title"
            [(ngModel)]="task.title" 
            required
            placeholder="Type your task title here..."
            class="form-control"
            [class.error]="taskForm.submitted && !task.title">
          <div *ngIf="taskForm.submitted && !task.title" class="error-message">
            Task title is required
          </div>
        </div>

        <div class="form-group">
          <label for="priority">Priority</label>
          <select 
            id="priority" 
            name="priority"
            [(ngModel)]="task.priority" 
            class="form-control">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit" class="submit-btn" [disabled]="!task.title">
          Add Task
        </button>
      </form>
    </div>
  `,
  styles: [`
    .task-form-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 25px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
      border: 2px solid #667eea;
    }

    h3 {
      text-align: center;
      color: #667eea;
      margin-bottom: 25px;
      font-size: 1.8rem;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-control {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #667eea;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s ease;
      background: white;
    }

    .form-control:focus {
      outline: none;
      border-color: #5a67d8;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
      transform: scale(1.02);
    }

    .form-control.error {
      border-color: #667eea;
      background: #f7fafc;
    }



    .error-message {
      color: #667eea;
      font-size: 12px;
      margin-top: 5px;
      font-weight: 500;
    }

    .submit-btn {
      width: 100%;
      background: #667eea;
      color: white;
      border: none;
      padding: 15px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .submit-btn:hover:not(:disabled) {
      background: #5a67d8;
      transform: scale(1.02);
      box-shadow: 0 6px 15px rgba(102, 126, 234, 0.3);
    }

    .submit-btn:disabled {
      background: #6c757d;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  `]
})
export class TaskFormComponent {
  task: Partial<TaskItem> = {
    title: '',
    priority: 'Medium'
  };

  constructor(private taskService: TaskService) {}

  onSubmit() {
    if (this.task.title && this.task.priority) {
      this.taskService.addTask({
        title: this.task.title,
        priority: this.task.priority
      } as Omit<TaskItem, 'id' | 'completed'>).subscribe({
        next: () => {
          // Reset form
          this.task = {
            title: '',
            priority: 'Medium'
          };
          // Emit event to refresh task list (could use a service or event emitter)
          window.location.reload(); // Simple refresh for now
        },
        error: (error) => {
          console.error('Error adding task:', error);
        }
      });
    }
  }
}
