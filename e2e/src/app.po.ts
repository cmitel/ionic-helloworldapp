import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get('/');
  }

  getTitleHeader() {
    return element(by.deepCss('app-root ion-title')).getText();
  }
}
