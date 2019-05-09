import { AppPage } from './app.po';

describe('TodoListPage', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.load();
  });

  it('should not be blank', () => {
    expect(page.rootElement().isDisplayed()).toBeTruthy();
  });

  it('should display the title', () => {
    expect(page.getTitle()).toContain('TodoList');
  });

  it('should display the input text', () => {
    expect(page.getInputText().isDisplayed()).toBeTruthy();
  });

  it('should display the add button', () => {
    expect(page.getAddButton().isDisplayed()).toBeTruthy();
  });

  it('should display the task list', () => {
    expect(page.getTaskList().isDisplayed()).toBeTruthy();
  });

  it('should display a blank task list by default', () => {
    expect(page.getTaskRowsFromList().count()).toEqual(0);
  });

});
