import { TodoTask } from 'src/app/models/todo-task.model';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoTaskComponent } from './todo-task.component';

describe('TodoTaskComponent', () => {
  let component: TodoTaskComponent;
  let fixture: ComponentFixture<TodoTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoTaskComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should have delete event emitter', () => {
    expect(component.delete instanceof EventEmitter).toBeTruthy();
  });

  it('should have check event emitter', () => {
    expect(component.check instanceof EventEmitter).toBeTruthy();
  });

  it('should have a TodoTask object as Input', () => {
    expect(component.task).toEqual(null);
  });

  it('should display by default the TodoTask object as string', () => {

    const hostElement: HTMLElement = fixture.nativeElement;
    const pElement: HTMLElement = hostElement.querySelector('p');

    component.task = new TodoTask('My new todo task');
    fixture.detectChanges();

    expect(pElement.textContent.trim()).toEqual('My new todo task');
  });

  it('should display by default the check and delete buttons action', () => {

    const hostElement: HTMLElement = fixture.nativeElement;

    component.task = new TodoTask('My new todo task');
    fixture.detectChanges();

    expect(hostElement.querySelectorAll('ion-button').length).toEqual(2);
  });

  it('should hide by default the pending check state icon', () => {

    const hostElement: HTMLElement = fixture.nativeElement;

    component.task = new TodoTask('My new todo task');
    fixture.detectChanges();

    expect(component.isDone).toBeFalsy();
    expect(hostElement.querySelector('ion-icon[name="done-all"]')).toEqual(null);

  });

  it('should hide the add and delete buttons action, when the task has been checked', () => {

    const hostElement: HTMLElement = fixture.nativeElement;

    spyOn(component.check, 'emit').and.callThrough();

    component.task = new TodoTask('My new todo task');
    fixture.detectChanges();

    component.onCheck();
    fixture.detectChanges();

    expect(component.check.emit).toHaveBeenCalled();
    expect(component.isDone).toBeTruthy();
    expect(hostElement.querySelectorAll('ion-button').length).toEqual(0);
  });

  it('should display the pending check state icon, when the task has been done', () => {

    const hostElement: HTMLElement = fixture.nativeElement;

    spyOn(component.check, 'emit').and.callThrough();

    component.task = new TodoTask('My new todo task');
    fixture.detectChanges();

    component.onCheck();
    fixture.detectChanges();

    expect(component.isDone).toBeTruthy();
    expect(hostElement.querySelector('ion-icon[name="done-all"]')).not.toEqual(null);
  });

  it('should emit delete event when delete button is pressed', () => {
    const hostElement: HTMLElement = fixture.nativeElement;

    const deleteEvtSpy = spyOn(component.delete, 'emit').and.callThrough();
    const onDeleteSpy = spyOn(component, 'onDelete').and.callThrough();

    component.task = new TodoTask('My new todo task');
    fixture.detectChanges();

    hostElement.querySelector('ion-icon[name="trash"]').parentElement.click();
    fixture.detectChanges();

    expect(onDeleteSpy).toHaveBeenCalled();
    expect(deleteEvtSpy).toHaveBeenCalled();
  });

  it('should emit check event when check button is pressed', () => {
    const hostElement: HTMLElement = fixture.nativeElement;

    const checkEvtSpy = spyOn(component.check, 'emit').and.callThrough();
    const onCheckSpy = spyOn(component, 'onCheck').and.callThrough();

    component.task = new TodoTask('My new todo task');
    fixture.detectChanges();

    hostElement.querySelector('ion-icon[name="checkmark"]').parentElement.click();
    fixture.detectChanges();

    expect(onCheckSpy).toHaveBeenCalled();
    expect(checkEvtSpy).toHaveBeenCalled();
  });

});
