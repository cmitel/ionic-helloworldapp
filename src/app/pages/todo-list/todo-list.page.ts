import { TodoTask } from './../../models/todo-task.model';
import { Component, OnInit } from '@angular/core';
import { TaskStorage } from 'src/app/services/storage/task-storage.service';
import { Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  taskTabSubject: Subject<TodoTask[]> = new Subject();
  taskTab$: Observable<TodoTask[]> = this.taskTabSubject.asObservable();

  constructor(
    private readonly taskStorage: TaskStorage
  ) { }

  ngOnInit() {
    this.updateList();
  }

  onNewTask(newTask: TodoTask): void {

    this.taskStorage.addTask(newTask)
      .pipe(take(1))
      .subscribe(res => {
        if (res) {
          this.updateList();
        } else {
          // todo display error
          console.error('Unable to add task');
        }
      });
  }

  private updateList(): void {

      this.taskStorage.getTasks()
      .pipe(take(1))
      .subscribe(tab => {
        this.taskTabSubject.next(tab);
      });
  }



}
