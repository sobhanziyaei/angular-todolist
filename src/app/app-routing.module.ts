import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Todolist',
    loadChildren: () => import('./todolist/todolist.module').then(m => m.TodolistModule)
  },
  {
    path: '',
    redirectTo: 'Todolist',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'Todolist',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
