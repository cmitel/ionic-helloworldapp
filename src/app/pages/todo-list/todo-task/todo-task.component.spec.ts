import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTaskPage } from './todo-task.page';

describe('TodoTaskPage', () => {
  let component: TodoTaskPage;
  let fixture: ComponentFixture<TodoTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
