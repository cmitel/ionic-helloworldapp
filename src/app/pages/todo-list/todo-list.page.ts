import { TodoTask } from './../../models/todo-task.model';
import { Component, OnInit } from '@angular/core';
import { TaskStorage } from 'src/app/services/storage/task-storage.service';
import { Observable, of, Subject } from 'rxjs';

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

    const subscription = this.taskStorage.addTask(newTask).subscribe(res => {
      if (res) {
        this.updateList();
      } else {
        // todo display error
        console.error('Unable to add task');
      }

      subscription.unsubscribe();
    });
  }

  private updateList(): void {

    const subscription = this.taskStorage.getTasks().subscribe(tab => {
      this.taskTabSubject.next(tab);
      subscription.unsubscribe();
    });
  }

}
