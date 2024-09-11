
import { PreviewButtonStateConfig } from '../../../../server/src/config';
import getPublishStateConfig, { defaultRequiredConfig } from '../getPublishStateConfig';

describe('getPublishStateConfig', () => {
  it('should return a config object with required props', () => {
    const data = { slug: 'foobar' };
    const input = { url: 'https://example.com/{slug}' };
    const result = getPublishStateConfig(input, data) as PreviewButtonStateConfig;
    const requiredKeys = [...Object.keys(defaultRequiredConfig), 'url'];

    expect(Object.keys(result)).toEqual(requiredKeys);
  });

  it('should populate values into the `url` prop', () => {
    const data = { slug: 'foobar' };
    const input = { url: 'https://example.com/{slug}' };
    const output = 'https://example.com/foobar';
    const result = getPublishStateConfig(input, data) as PreviewButtonStateConfig;

    expect(result.url).toEqual(output);
  });

  it('should return null if params are null', () => {
    // @ts-expect-error - Intentionally passing null for the test.
    const result = getPublishStateConfig(null, null);

    expect(result).toBeNull();
  });
});
