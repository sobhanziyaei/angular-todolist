import { Injectable } from '@angular/core';
import { Task } from '../data/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksKey = 'tasks';

  constructor() { }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  saveTask(name: string, priority: string): void {
    if (!this.isLocalStorageAvailable()) {
      console.error('localStorage is not available.');
      return;
    }
    const tasks = this.getTasks();
    const newTask: Task = { id: Date.now(), name: name, priority: priority, status: 'todo' };
    tasks.push(newTask);
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }

  getTasks(): Task[] {
    if (!this.isLocalStorageAvailable()) {
      console.error('localStorage is not available.');
      return [];
    }
    const tasks = localStorage.getItem(this.tasksKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  deleteTask(id: number): void {
    if (!this.isLocalStorageAvailable()) {
      console.error('localStorage is not available.');
      return;
    }
    const tasks = this.getTasks().filter(t => t.id !== id);
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }

  updateTask(id: number, name: string, priority: string, status?: string): void {
    if (!this.isLocalStorageAvailable()) {
      console.error('localStorage is not available.');
      return;
    }
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index > -1) {
      tasks[index].name = name;
      tasks[index].priority = priority;
      if (status) {
        tasks[index].status = status;
      }
      localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
    }
  }

  findTaskById(id: number): Task | undefined {
    if (!this.isLocalStorageAvailable()) {
      console.error('localStorage is not available.');
      return undefined;
    }
    const tasks = this.getTasks();
    return tasks.find(t => t.id === id);
  }
}
