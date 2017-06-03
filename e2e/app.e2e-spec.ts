import { JobboardPage } from './app.po';

describe('jobboard App', () => {
  let page: JobboardPage;

  beforeEach(() => {
    page = new JobboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
