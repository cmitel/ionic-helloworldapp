import { TodoTask } from './../../../models/todo-task.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  taskTab: TodoTask[] = [
    new TodoTask('Go to the gym'),
    new TodoTask('Call Adriana'),
    new TodoTask('Buy new shoes for Kevin and Susan, because the old ones are ripped'),
  ];

  constructor() { }

  ngOnInit() {}

  /**
   * Adds a new task to the current list of todo task
   * @param task The new todo task to add
   */
  add(task: TodoTask): void {
    this.taskTab = this.taskTab.concat([ task ], this.taskTab);
  }

}
