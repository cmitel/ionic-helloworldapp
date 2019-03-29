import { TodoTask } from './../../../models/todo-task.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss'],
})
export class TodoTaskComponent implements OnInit {

  @Input() task: TodoTask;

  constructor() { }

  ngOnInit() {}

}
