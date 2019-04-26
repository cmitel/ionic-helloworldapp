import { Observable, of } from 'rxjs';
import { TaskStorage } from './../../services/storage/task-storage.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListPage } from './todo-list.page';

describe('TodoListPage', () => {
  let component: TodoListPage;
  let fixture: ComponentFixture<TodoListPage>;
  let taskStorageSpy: jasmine.SpyObj<TaskStorage>;

  beforeEach(async(() => {

    const spy = jasmine.createSpyObj('TaskStorage', ['getTasks', 'addTask', 'deleteTask']);
    spy.addTask.and.returnValue(of({}));
    spy.getTasks.and.returnValue(of([]));

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
    fixture = TestBed.createComponent(TodoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    taskStorageSpy = TestBed.get(TaskStorage);
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

});
