import { TodoTask } from './../../../models/todo-task.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss'],
})
export class TodoTaskComponent implements OnInit {

  @Input() task: TodoTask;
  @Output() delete: EventEmitter<TodoTask> = new EventEmitter();
  @Output() check: EventEmitter<TodoTask> = new EventEmitter();

  isDone = false;

  constructor() { }

  ngOnInit() {}

  onDelete(): void {
    this.delete.emit(this.task);
  }

  onCheck(): void {
    this.isDone = true;
    this.check.emit(this.task);
  }

}
