import { TaskStorage } from './task-storage.service';
import { of } from 'rxjs';
import { TodoTask } from 'src/app/models/todo-task.model';

describe('TaskStorage service', () => {
  let service: TaskStorage;
  let storageServiceSpy;

  const date1 = new Date(2019, 2);
  const date2 = new Date(2019, 3);
  const data = {};
  data[date1.getTime()] = new TodoTask('task1', date1);
  data[date2.getTime()] = new TodoTask('task2', date2);

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('Storage', [
      'keys',
      'get',
      'set',
      'remove'
    ]);

    storageServiceSpy.keys.and.returnValue(new Promise((resolve) => resolve([
      date1.getTime(),
      date2.getTime()
    ])));

    storageServiceSpy.get.and.callFake(key => new Promise(resolve => resolve(data[key])));

    service = new TaskStorage(storageServiceSpy);
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  describe('getTasks method', () => {
    it('should return the stored tasks ordered ascending by the creation date of task', (done: DoneFn) => {

      const promiseResult = service.getTasks();

      expect(promiseResult).toBeDefined();

      promiseResult.subscribe(r => {

        expect(storageServiceSpy.keys.calls.count()).toBe(1);
        expect(storageServiceSpy.get.calls.count()).toBe(2);

        expect(r).toBeDefined();
        expect(r).not.toBeNull();

        expect(r.length).toEqual(2);
        expect(r[0].toString()).toEqual('task1');

        done();
      });

    });
  });

  describe('addTask', () => {

    it('should return TRUE when the new task has been added', (done: DoneFn) => {

      storageServiceSpy.set.and.returnValue(new Promise(resolve => resolve(true)));

      const promiseResult = service.addTask(new TodoTask('content'));

      expect(promiseResult).toBeDefined();

      promiseResult.subscribe(r => {
        expect(storageServiceSpy.set.calls.count()).toBe(1);
        expect(r).toBeTruthy();
        done();
      });

    });

    it('should return FALSE when the new task has not been added', (done: DoneFn) => {

      storageServiceSpy.set.and.throwError('Error');

      const promiseResult = service.addTask(new TodoTask('content'));

      expect(promiseResult).toBeDefined();

      promiseResult.subscribe(r => {
        expect(storageServiceSpy.set.calls.count()).toBe(1);
        expect(r).toBeFalsy();
        done();
      });
    });

  });

  describe('deleteTask', () => {

    it('should return TRUE when the task has been removed', (done: DoneFn) => {

      const taskToDelete = data[date1.getTime()];
      storageServiceSpy.get.and.returnValue(new Promise(resolve => resolve(taskToDelete)));
      storageServiceSpy.remove.and.returnValue(new Promise(resolve => resolve(true)));

      const promiseResult = service.deleteTask(taskToDelete);

      expect(promiseResult).toBeDefined();

      promiseResult.subscribe(r => {
        expect(storageServiceSpy.get.calls.count()).toBe(1);
        expect(storageServiceSpy.remove.calls.count()).toBe(1);
        expect(r).toBeTruthy();
        done();
      });
    });

    it('should return FALSE when the task not exists', (done: DoneFn) => {

      const taskToDelete = data[date1.getTime()];
      storageServiceSpy.get.and.returnValue(new Promise(resolve => resolve(false)));

      const promiseResult = service.deleteTask(taskToDelete);

      expect(promiseResult).toBeDefined();

      promiseResult.subscribe(r => {
        expect(storageServiceSpy.get.calls.count()).toBe(1);
        expect(storageServiceSpy.remove.calls.count()).toBe(0);
        expect(r).toBeFalsy();
        done();
      });

    });

    it('should return FALSE when the task exists but has not been deleted', (done: DoneFn) => {

      const taskToDelete = data[date1.getTime()];
      storageServiceSpy.get.and.returnValue(new Promise(resolve => resolve(taskToDelete)));
      storageServiceSpy.remove.and.returnValue(new Promise((resolve, reject) => reject(false)));

      const promiseResult = service.deleteTask(taskToDelete);

      expect(promiseResult).toBeDefined();

      promiseResult.subscribe(r => {
        expect(storageServiceSpy.get.calls.count()).toBe(1);
        expect(storageServiceSpy.remove.calls.count()).toBe(1);
        expect(r).toBeFalsy();
        done();
      });
    });

  });

});
