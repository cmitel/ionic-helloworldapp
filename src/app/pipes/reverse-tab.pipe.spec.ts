import { ReverseTabPipe } from 'src/app/pipes/reverse-tab.pipe';

describe('ReverseTabPipe', () => {

  let pipe: ReverseTabPipe;
  const tab = [1, 2, 3];
  const reversed = [3, 2, 1];

  beforeEach(() => {
    pipe = new ReverseTabPipe();
  });

  it('should exist', () => {
    expect(pipe).toBeDefined();
  });

  it('should reverse an array values', () => {
    expect(pipe.transform(tab)).toEqual(reversed);
  });

});
