import { DefioPage } from './app.po';

describe('defio App', () => {
  let page: DefioPage;

  beforeEach(() => {
    page = new DefioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
