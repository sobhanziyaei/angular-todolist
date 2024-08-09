import { Component, ViewChild } from '@angular/core';
import { TaskNewEditComponent } from '../task-new-edit/task-new-edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('TaskNewEdit') modalNewEditTask: TaskNewEditComponent | undefined;

  showDialog() {

    this.modalNewEditTask?.open();

  }

}
