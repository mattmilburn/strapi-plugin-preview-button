import getPublishStateConfig, { defaultRequiredConfig } from '../get-publish-state-config';

describe('getPublishStateConfig', () => {
  it('should return a config object with required props', () => {
    const data = { slug: 'foobar' };
    const input = { url: 'https://example.com/{slug}' };
    const result = getPublishStateConfig(input, data);
    const requiredKeys = [...Object.keys(defaultRequiredConfig), 'url'];

    expect(Object.keys(result)).toEqual(requiredKeys);
  });

  it('should populate values into the `url` prop', () => {
    const data = { slug: 'foobar' };
    const input = { url: 'https://example.com/{slug}' };
    const output = 'https://example.com/foobar';
    const result = getPublishStateConfig(input, data);

    expect(result.url).toEqual(output);
  });

  it('should return null if params are null', () => {
    const result = getPublishStateConfig(null, null);

    expect(result).toBeNull();
  });
});
