import trimSlashes from '../trim-slashes';

describe('trimSlashes', () => {
  it('should remove outer slashes from a string', () => {
    const input1 = '/foo/bar/';
    const input2 = '/foo/bar';
    const input3 = ' foo/bar/';
    const output = `foo/bar`;
    const result1 = trimSlashes(input1);
    const result2 = trimSlashes(input2);
    const result3 = trimSlashes(input3);

    expect(result1).toEqual(output);
    expect(result2).toEqual(output);
    expect(result3).toEqual(output);
  });
});
