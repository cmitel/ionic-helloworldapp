import { TodoTask } from 'src/app/models/todo-task.model';
import { Observable, of } from 'rxjs';
import { TaskStorage } from 'src/app/services/storage/task-storage.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TodoListPage } from './todo-list.page';

describe('TodoListPage', () => {
  let component: TodoListPage;
  let fixture: ComponentFixture<TodoListPage>;
  let taskStorageSpy: jasmine.SpyObj<TaskStorage>;
  const defaultTasks = [ new TodoTask('task1'), new TodoTask('task2'), new TodoTask('task3') ];
  let newTasks = [];

  beforeEach(async(() => {

    newTasks = [];

    const spy = jasmine.createSpyObj('TaskStorage', ['getTasks', 'addTask', 'deleteTask']);
    spy.addTask.and.callFake(newTask => {
      newTasks.push(newTask);
      return of(newTask);
    });
    spy.getTasks.and.returnValue(of( defaultTasks.concat(newTasks) ));
    spy.deleteTask.and.returnValue(of(defaultTasks));

    TestBed.configureTestingModule({
      providers: [
        { provide: TaskStorage, useValue: spy }
      ],
      declarations: [ TodoListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    taskStorageSpy = TestBed.get(TaskStorage);
    fixture = TestBed.createComponent(TodoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should use the app-create-task component for creating new task', () => {
    expect(fixture.nativeElement.querySelector('app-create-task')).toBeTruthy();
  });

  it('should use the app-task-list component for displaying the list of task', () => {
    expect(fixture.nativeElement.querySelector('app-task-list')).toBeTruthy();
  });

  it('should handle new task event with onNewTask', () => {
    expect(component.onNewTask).toBeDefined();
  });

  it('should push to storage the new emitted task', () => {

    spyOn(component.taskTabSubject, 'next');

    component.ngOnInit();
    fixture.detectChanges();

    expect(taskStorageSpy.getTasks).toHaveBeenCalled();
    expect(component.taskTabSubject.next).toHaveBeenCalledWith(defaultTasks);

    const newTaskData = new TodoTask('new task');
    component.onNewTask(newTaskData);
    fixture.detectChanges();

    expect(taskStorageSpy.addTask).toHaveBeenCalledWith(newTaskData);
    expect(taskStorageSpy.getTasks).toHaveBeenCalled();
  });

  it('should retrieve from the storage the list of tasks', () => {

    spyOn(component.taskTabSubject, 'next');

    component.ngOnInit();
    fixture.detectChanges();

    expect(taskStorageSpy.getTasks).toHaveBeenCalled();
    expect(component.taskTabSubject.next).toHaveBeenCalledWith(defaultTasks);
  });

});
