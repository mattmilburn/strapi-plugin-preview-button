/** @jest-environment jsdom */
import type { PreviewButtonStateConfig } from '../../../../server/src/config';
import getPublishStateConfig, { defaultRequiredConfig } from '../getPublishStateConfig';

describe('getPublishStateConfig', () => {
  it('should return a config object with required props', () => {
    const data = { slug: 'foobar' };
    const input = { url: 'https://example.com/{slug}' };
    const result = getPublishStateConfig(input, data) as PreviewButtonStateConfig;

    expect(Object.keys(result)).toEqual(Object.keys(defaultRequiredConfig));
  });

  it('should populate values into the `url` prop', () => {
    const data = { slug: 'foobar' };
    const input = { url: 'https://example.com/{slug}' };
    const output = 'https://example.com/foobar';
    const result = getPublishStateConfig(input, data) as PreviewButtonStateConfig;

    expect(result.url).toEqual(output);
  });
});
