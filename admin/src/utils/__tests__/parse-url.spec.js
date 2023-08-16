import parseUrl from '../parse-url';

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

  it('should return null if params are null', () => {
    const result = parseUrl(null, null);

    expect(result).toBeNull();
  });
});
