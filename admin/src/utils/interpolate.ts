const interpolate = (originalStr: string, data: any = {}): string => {
  let str = originalStr;

  Object.entries(data).forEach(([key, value]: [string, any]) => {
    // eslint-disable-next-line prefer-regex-literals
    str = str.replace(new RegExp(`{${key}}`, 'g'), value);
  });

  // Replace any remaining values with an empty string.
  // eslint-disable-next-line prefer-regex-literals
  str = str.replace(new RegExp(`{(.*)}`, 'g'), '').trim();

  return str;
};

export default interpolate;
