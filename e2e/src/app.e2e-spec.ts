import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should not be blank', () => {
    page.navigateTo();
    expect(page.getTitleHeader()).toContain('TodoList');
  });
});
