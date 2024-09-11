const trimSlashes = (str: string): string => str.replace(/^\/|\/$/g, '').trim();

export default trimSlashes;
