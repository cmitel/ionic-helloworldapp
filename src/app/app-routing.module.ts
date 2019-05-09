import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListPageModule } from './pages/todo-list/todo-list.module';

const routes: Routes = [
  { path: '', redirectTo: 'todo-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, TodoListPageModule ]
})
export class AppRoutingModule { }
