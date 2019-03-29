import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoTask } from 'src/app/models/todo-task.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {

  @Output() newTask: EventEmitter<TodoTask> = new EventEmitter();

  enableButton: Boolean = false;
  taskContent: String = '';

  constructor() { }

  ngOnInit() {}

  onTypedText(txt: String): void {
    this.taskContent = txt;
    this.enableButton = (txt !== '');
  }

  onAddTask() {
    this.newTask.emit( new TodoTask(this.taskContent) );
  }

}
