import { of } from 'rxjs';
import { TaskStorage } from './../../../services/storage/task-storage.service';
import { TaskListComponent } from './task-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReverseTabPipe } from 'src/app/pipes/reverse-tab.pipe';
import { TodoTask } from 'src/app/models/todo-task.model';

@Pipe({name: 'reverseTab'})
class MockPipe implements PipeTransform {
    transform(value: number): number {
        // blah blah
        return value;
    }
}

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskStorageSpy: jasmine.SpyObj<TaskStorage>;
  let pipe: MockPipe;

  beforeEach(async(() => {

    const spy = jasmine.createSpyObj('TaskStorage', ['getTasks', 'addTask', 'deleteTask']);
    spy.addTask.and.returnValue(of({}));
    spy.getTasks.and.returnValue(of([]));
    spy.deleteTask.and.returnValue(of(true));

    pipe = new MockPipe();

    TestBed.configureTestingModule({
      declarations: [ TaskListComponent, MockPipe ],
      providers: [
        {provide: TaskStorage, useValue: spy },
        {provide: ReverseTabPipe, useValue: pipe }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    taskStorageSpy = TestBed.get(TaskStorage);
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should have onDeleteTask to handle task deletion event', () => {
    expect(component.onDeleteTask).toBeDefined();
  });

  it('should have onCheckTask to handle task checking event', () => {
    expect(component.onCheckTask).toBeDefined();
  });

  it('should display list of task', () => {

    const hostElement: HTMLElement = fixture.nativeElement;

    expect(hostElement.querySelectorAll('app-todo-task').length).toEqual(0);

    component.taskTab = [ new TodoTask('task1'), new TodoTask('task2') ];
    fixture.detectChanges();

    expect(hostElement.querySelectorAll('app-todo-task').length).toEqual(2);
  });

  it('should update the list of task on check task event', () => {
    expect(true).toBeDefined();
  });

  it('should update the list of task on delete task event', fakeAsync(() => {

    const hostElement: HTMLElement = fixture.nativeElement;

    const nextSpy = spyOn(component.changeListSubject, 'next').and.callThrough();
    // const spliceSpy = spyOn(component.taskTab, 'splice').and.callThrough();
    spyOn(console, 'error').and.callThrough();

    const data = [ new TodoTask('task1'), new TodoTask('task2') ];

    component.taskTab = data;

    fixture.detectChanges();

    expect(component.taskTab.length).toEqual(2);

    component.onDeleteTask(data[0], 0);
    fixture.detectChanges();
    tick(10000);

    expect(console.error).not.toHaveBeenCalled();
    expect(taskStorageSpy.deleteTask).toHaveBeenCalled();
    expect(nextSpy).toHaveBeenCalled();
    // expect(spliceSpy).toHaveBeenCalled();
    expect(component.taskTab.length).toEqual(1);
    expect(component.taskTab[0].toString()).toEqual('task2');
    expect(hostElement.querySelectorAll('app-todo-task').length).toEqual(1);
  }));

});
