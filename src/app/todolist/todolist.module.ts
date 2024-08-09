import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TodolistRoutingModule } from './todolist-routing.module';
import { HomeComponent } from './home/home.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TaskNewEditComponent } from './task-new-edit/task-new-edit.component';

@NgModule({
  declarations: [
    HomeComponent,
    TaskNewEditComponent
  ],
  imports: [
    CommonModule,
    TodolistRoutingModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    CardModule
  ]
})
export class TodolistModule { }
