import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TodoListPage } from './todo-list.page';
import { CreateTaskComponent } from './create-task/create-task.component';
import { AddButtonComponent } from './create-task/add-button/add-button.component';
import { InputTextComponent } from './create-task/input-text/input-text.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TodoListPage, CreateTaskComponent, AddButtonComponent, InputTextComponent, TaskListComponent, TodoTaskComponent]
})
export class TodoListPageModule {}
