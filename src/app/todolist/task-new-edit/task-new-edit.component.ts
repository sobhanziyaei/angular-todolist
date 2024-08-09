import { Component } from '@angular/core';

@Component({
  selector: 'app-task-new-edit',
  templateUrl: './task-new-edit.component.html',
  styleUrl: './task-new-edit.component.css'
})
export class TaskNewEditComponent {

  visible: boolean = false;

  open(){
    this.visible = true ;
  }

}
