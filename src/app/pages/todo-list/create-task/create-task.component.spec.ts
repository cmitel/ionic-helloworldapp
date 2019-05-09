import { InputTextComponent } from './input-text/input-text.component';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTaskComponent } from './create-task.component';
import { AddButtonComponent } from './add-button/add-button.component';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let hostElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskComponent, AddButtonComponent, InputTextComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ IonicModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should have one app-add-button child component', () => {
    expect(hostElement.querySelector('app-add-button')).toBeTruthy();
  });

  it('should have one app-input-text child component', () => {
    expect(hostElement.querySelector('app-input-text')).toBeTruthy();
  });

  it('should have newTask event emitter property', () => {
    expect(component.newTask).toBeDefined();
    expect(component.newTask instanceof EventEmitter).toBeTruthy();
  });

  it('should have clearAction property and by default equals to TRUE', () => {
    expect(component.clearAction).toBeTruthy();
  });

  it('should have enableButton property and by default equals to FALSE', () => {
    expect(component.enableButton).toBeFalsy();
  });

  it('should have taskContent property and by default is empty', () => {
    expect(component.taskContent).toEqual('');
  });

  it('should have onTypedText to handle typed text event from the InputTextComponent', () => {
    expect(component.onTypedText).toBeDefined();
  });

  it('should have onAddTask to handle add new task buttton pressed event from the AddButtonComponent', () => {
    expect(component.onAddTask).toBeDefined();
  });

  it('should enable the add button when non empty text has been typed', () => {

    component.onTypedText('');
    fixture.detectChanges();

    expect(component.enableButton).toBeFalsy();
    expect(hostElement.querySelector('app-add-button').getAttribute('ng-reflect-enable-btn')).toEqual('false');

    component.onTypedText('my new task content');
    fixture.detectChanges();

    expect(component.enableButton).toBeTruthy();
    expect(hostElement.querySelector('app-add-button').getAttribute('ng-reflect-enable-btn')).toEqual('true');
  });

  it('should emit a new TodoTask object when the add button has been pressed', () => {

    component.onTypedText('my new task content');
    fixture.detectChanges();

    const spy = spyOn(component.newTask, 'emit').and.callThrough();

    component.onAddTask();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should send the clear event to the InputTextComponent after the new task has been added', () => {

    expect(component.clearAction).toBeTruthy();

    component.onTypedText('my new task content');
    fixture.detectChanges();

    component.onAddTask();
    fixture.detectChanges();
    expect(component.clearAction).toBeFalsy();

    component.onAddTask();
    fixture.detectChanges();
    expect(component.clearAction).toBeTruthy();
  });

});
