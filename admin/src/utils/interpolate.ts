const interpolate = (originalStr: string, data: Record<string, any> = {}): string => {
  let str = originalStr;

  Object.entries(data).forEach(([key, value]: [string, any]) => {
    str = str.replace(new RegExp(`{${key}}`, 'g'), value);
  });

  // Replace any remaining values with an empty string.
  str = str.replace(new RegExp(`{(.*)}`, 'g'), '').trim();

  return str;
};

export default interpolate;
