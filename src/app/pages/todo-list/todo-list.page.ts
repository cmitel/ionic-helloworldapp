import { TodoTask } from 'src/app/models/todo-task.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  taskTab: TodoTask[] = [
    new TodoTask('Go to the gym'),
    new TodoTask('Call Adriana'),
    new TodoTask('Buy new shoes for Kevin and Susan, because the old ones are ripped'),
  ];

  constructor() { }

  ngOnInit() {
  }

  onNewTask(newTask: TodoTask): void {
    this.taskTab = this.taskTab.concat([ newTask ]);
  }

}
