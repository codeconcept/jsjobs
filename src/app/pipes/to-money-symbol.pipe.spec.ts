import { ToMoneySymbolPipe } from './to-money-symbol.pipe';

describe('ToMoneySymbolPipe', () => {
  it('create an instance', () => {
    const pipe = new ToMoneySymbolPipe();
    expect(pipe).toBeTruthy();
  });
});
