import { Component, Output, ViewChild } from '@angular/core';
import { TaskService } from '../service/task.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-new-edit',
  templateUrl: './task-new-edit.component.html',
  styleUrl: './task-new-edit.component.css'
})
export class TaskNewEditComponent {
  @Output() taskSaved: EventEmitter<string> = new EventEmitter<string>();
  visible: boolean = false;
  taskValue: string | undefined;
  selectedPriority: any;
  priorityValue: string | undefined;
  priorityDataSource: any = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ]
  id!: number;

  constructor(private taskService: TaskService) { }

  open(id: number) {

    this.taskValue = '';
    this.selectedPriority = null;

    if (id != 0) {
      let task = this.taskService.findTaskById(id);
      this.taskValue = task?.name;
      this.selectedPriority = this.priorityDataSource.find((priority: any) => priority.value === task?.priority);
    }
    this.id = id;
    this.visible = true;
  }

  onPriorityChange(event: any) {
    this.priorityValue = event.value;
  }

  saveTask() {
    if (this.taskValue && this.priorityValue) {

      if (this.id == 0) {
        this.taskService.saveTask(this.taskValue, this.priorityValue);
      } else {
        this.taskService.updateTask(this.id, this.taskValue, this.priorityValue);
      }

      this.taskValue = '';
      this.visible = false;
      this.taskSaved.emit();
    }

  }

}
