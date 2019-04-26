import { of } from 'rxjs';
import { TaskStorage } from './../../../services/storage/task-storage.service';
import { TaskListComponent } from './task-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReverseTabPipe } from 'src/app/pipes/reverse-tab.pipe';

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
});
