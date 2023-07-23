import interpolate from '../interpolate';

describe('interpolate', () => {
  it('should populate variables into a string', () => {
    const data = {
      foo: 'quick brown fox',
      bar: 'lazy dog',
    };
    const input = 'The {foo} jumps over the {bar}.';
    const output = `The ${data.foo} jumps over the ${data.bar}.`;
    const result = interpolate(input, data);

    expect(result).toEqual(output);
  });
});
