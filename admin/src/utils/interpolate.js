const interpolate = ( str, data = {} ) => {
  Object.entries( data ).forEach( ( [ key, value ] ) => {
    str = str.replace( new RegExp( `{${key}}`, 'g' ), value );
  } );

  return str;
};

export default interpolate;
