import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, TaskItem } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-list-container">
      <h2>Task Manager</h2>
      
      <!-- Filters -->
      <div class="filters">
        <select [(ngModel)]="priorityFilter" (change)="applyFilters()">
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        
        <select [(ngModel)]="statusFilter" (change)="applyFilters()">
          <option value="">All Status</option>
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
      </div>

      <!-- Task List -->
      <div class="task-list">
        <div *ngFor="let task of filteredTasks" class="task-item" [class.completed]="task.completed">
          <div class="task-info">
            <h3 [class.completed-text]="task.completed">{{ task.title }}</h3>
            <span class="priority priority-{{ task.priority.toLowerCase() }}">{{ task.priority }}</span>
            <span class="status">{{ task.completed ? 'Completed' : 'Pending' }}</span>
          </div>
          <button 
            *ngIf="!task.completed" 
            (click)="completeTask(task.id)"
            class="complete-btn">
            Complete
          </button>
        </div>
      </div>

      <div *ngIf="filteredTasks.length === 0" class="no-tasks">
        No tasks found with the current filters.
      </div>
    </div>
  `,
  styles: [`
    .task-list-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    h2 {
      text-align: center;
      color: white;
      margin-bottom: 30px;
      font-size: 2.5rem;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      background: linear-gradient(135deg, #667eea 0%, #5a67d8 100%);
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
      border: 2px solid rgba(255, 255, 255, 0.2);
    }

    .filters {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      justify-content: center;
    }

    .filters select {
      padding: 10px 15px;
      border: 2px solid #667eea;
      border-radius: 8px;
      font-size: 14px;
      background: white;
      color: #333;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .filters select:focus {
      outline: none;
      border-color: #5a67d8;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
    }

    .task-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .task-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border: 2px solid #667eea;
      border-radius: 12px;
      background: white;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(102, 126, 234, 0.1);
    }

    .task-item:hover {
      box-shadow: 0 6px 12px rgba(102, 126, 234, 0.2);
      transform: translateY(-2px);
    }

    .task-item.completed {
      background: #f8f9fa;
      border-color: #28a745;
      box-shadow: 0 4px 6px rgba(40, 167, 69, 0.1);
    }

    .task-info {
      flex: 1;
    }

    .task-info h3 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 1.3rem;
    }

    .completed-text {
      text-decoration: line-through;
      color: #6c757d;
    }

    .priority {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      margin-right: 15px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .priority-high {
      background: #667eea;
      color: white;
      border: 2px solid #5a67d8;
    }

    .priority-medium {
      background: #ffc107;
      color: #212529;
      border: 2px solid #e0a800;
    }

    .priority-low {
      background: #28a745;
      color: white;
      border: 2px solid #1e7e34;
    }

    .status {
      font-size: 12px;
      color: #6c757d;
      font-weight: 500;
    }

    .complete-btn {
      background: #667eea;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .complete-btn:hover {
      background: #5a67d8;
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
    }

    .no-tasks {
      text-align: center;
      color: #6c757d;
      font-style: italic;
      padding: 40px;
      background: white;
      border-radius: 12px;
      border: 2px dashed #667eea;
    }
  `]
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  filteredTasks: TaskItem[] = [];
  priorityFilter: string = '';
  statusFilter: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  completeTask(id: number) {
    this.taskService.completeTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error completing task:', error);
      }
    });
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter(task => {
      const priorityMatch = !this.priorityFilter || task.priority === this.priorityFilter;
      const statusMatch = !this.statusFilter || task.completed.toString() === this.statusFilter;
      return priorityMatch && statusMatch;
    });
  }
}
