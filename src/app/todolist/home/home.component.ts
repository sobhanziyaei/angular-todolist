import { Component, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { TaskNewEditComponent } from '../task-new-edit/task-new-edit.component';
import { TaskService } from '../service/task.service';
import { Task } from '../data/task';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('TaskNewEdit') modalNewEditTask: TaskNewEditComponent | undefined;
  tasks: Task[] = []
  doneTaskCount: number = 0;
  todoTaskCount: number = 0;

  constructor(private taskService: TaskService, @Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.getData();
    }
  }

  showDialog() {
    this.modalNewEditTask?.open(0);
  }

  getData() {
    this.tasks = this.taskService.getTasks();
    this.getDataForReport();
  }

  getDataForReport() {
    this.doneTaskCount = 0;
    this.todoTaskCount = 0;
    this.tasks.forEach(task => {
      if (task.status == 'done') {
        this.doneTaskCount++
      } else if (task.status == 'todo') {
        this.todoTaskCount++
      }
    })
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return '';
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.getData();
  }

  editTask(id: number) {
    this.modalNewEditTask?.open(id);
  }

  doTask(id: number) {
    let task = this.taskService.findTaskById(id);
    if (task) {
      task.status = 'done';
      this.taskService.updateTask(task.id, task.name, task.priority, task.status);
      this.getData();
    }
  }


}
