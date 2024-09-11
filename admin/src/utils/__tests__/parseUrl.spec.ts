import parseUrl from '../parseUrl';

describe('parseUrl', () => {
  it('should populate variables into a URL string', () => {
    const config = {
      url: 'https://www.example.com/{locale}/{slug}',
    };
    const data = {
      locale: 'en',
      slug: 'test',
    };
    const output = 'https://www.example.com/en/test';
    const result = parseUrl(config, data);

    expect(result).toEqual(output);
  });

  it('should populate query string params into a URL string', () => {
    const config = {
      url: 'https://www.example.com/{locale}/{slug}',
      query: {
        secret: 'SECRET_KEY',
        type: 'page',
      },
    };
    const data = {
      locale: 'en',
      slug: 'test',
    };
    const output = 'https://www.example.com/en/test?secret=SECRET_KEY&type=page';
    const result = parseUrl(config, data);

    expect(result).toEqual(output);
  });

  it('should encode query string params', () => {
    const config = {
      url: 'https://www.example.com/{slug}',
      query: {
        type: 'page',
        foobar: '{foobar}',
      },
    };
    const data = {
      slug: 'test',
      foobar: 'foo/bar/test',
    };
    const output = 'https://www.example.com/test?type=page&foobar=foo%2Fbar%2Ftest';
    const result = parseUrl(config, data);

    expect(result).toEqual(output);
  });

  it('should escape pre-existing % characters when encoding query string params', () => {
    const config = {
      url: 'https://www.example.com/{slug}',
      query: {
        type: 'page',
        foobar: '{foobar}',
      },
    };
    const data = {
      slug: 'test',
      foobar: 'foo%bar%test',
    };
    const output = 'https://www.example.com/test?type=page&foobar=foo%25bar%25test';
    const result = parseUrl(config, data);

    expect(result).toEqual(output);
  });

  it('should return null if params are null', () => {
    // @ts-expect-error - Intentionally passing null for the test.
    const result = parseUrl(null, null);

    expect(result).toBeNull();
  });
});
