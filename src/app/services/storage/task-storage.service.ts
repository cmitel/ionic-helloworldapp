import { Observable, of, from, defer } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { TodoTask } from 'src/app/models/todo-task.model';
import { map, mergeMap, concatAll, single, first, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskStorage {

  constructor(
    private readonly storage: Storage
  ) { }

  /**
   * @returns List of stored tasks as Observable
   */
  getTasks(): Observable<TodoTask[]> {

    return defer(async () => {
      const keys = await this.storage.keys();
      const promises = [];

      keys.forEach(key => promises.push(this.storage.get(key)));

      return promises.length ? await Promise.all(promises).then(res => {

        const tab = [];
        res.forEach(t => {
          tab.push(new TodoTask(t.content, t.createDate));
        });

        return tab.sort((a: TodoTask, b: TodoTask) => {

          if (a.getDate().getTime() < b.getDate().getTime()) {
            return -1;
          } else if (a.getDate().getTime() === b.getDate().getTime()) {
            return 0;
          } else {
            return 1;
          }

        });

      }) : [];
    });
  }

  /**
   * @params task The new task to add
   * @returns The result of the operation as Observable
   */
  addTask(task: TodoTask): Observable<boolean> {

    return defer(async () => {
      await this.storage.set(task.getDate().getTime().toString(), task);
      return true;
    })
      .pipe(catchError(err => of(false)));
  }

  /**
   * @params task The task to delete
   * @returns The result of the operation as Observable
   */
  deleteTask(task: TodoTask): Observable<boolean> {

    return defer(async () => {

      const exist = await this.storage.get(task.getDate().getTime().toString());

      console.log('Exist :: ', exist);

      if (exist) {
        await this.storage.remove(task.getDate().getTime().toString());
        return true;
      } else {
        return false;
      }

    })
      .pipe(catchError(err => of(false)));
  }

}
