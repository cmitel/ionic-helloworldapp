import { Subject, Observable, of } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';
import { TodoTask } from './../../../models/todo-task.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  @Input() taskTab: TodoTask[] = [];

  changeListSubject: Subject<{action: String, task: TodoTask, position: number}> = new Subject();
  changeList$: Observable<{action: String, task: TodoTask, position: number}> = this.changeListSubject.asObservable();

  constructor() { }

  ngOnInit() {

    this.changeList$.pipe(
      mergeMap(val => val.action === 'check' ? of(val).pipe(delay(3000)) :  of(val))
    )
    .subscribe(v => {

      let position = -1;
      for (let i = 0; i < this.taskTab.length; i++) {

        if (this.taskTab[i] === v.task) {
          position = i;
          break;
        }
      }

      if (position > -1) {
        this.taskTab.splice(position, 1);
      }
    });
  }

  onDeleteTask(task: TodoTask, indexPosition: number): void {
    this.changeListSubject.next({
      action: 'delete',
      task,
      position: indexPosition,
    });
  }

  onCheckTask(task: TodoTask, indexPosition: number): void {

    this.changeListSubject.next({
      action: 'check',
      task,
      position: indexPosition,
    });
  }

}
