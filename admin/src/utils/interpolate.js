const interpolate = ( str, data = {} ) => {
  Object.entries( data ).forEach( ( [ key, value ] ) => {
    str = str.replace( new RegExp( `{${key}}`, 'g' ), value );
  } );

  // Replace any remaining values with an empty string.
  str = str.replace( new RegExp( `{(.*)}`, 'g' ), '' );

  return str;
};

export default interpolate;
