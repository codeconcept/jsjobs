import { ToShortDatePipe } from './to-short-date.pipe';

describe('ToShortDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ToShortDatePipe();
    expect(pipe).toBeTruthy();
  });
});
