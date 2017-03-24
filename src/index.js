function tf(obj) {
  const arr = [];
  tfr(arr, obj, null)
  return arr;
}

function tfr(arr, obj, level) {
  Object.keys(obj).forEach( e => {
    arr.push({ 'key': e, 'parent': level })
    if(Object.prototype.toString.call( obj[e] ) === '[object Object]') {
      tfr(arr, obj[e], e)
    }
  })
}

function treeTolist(arr, data) {
  const KEY = 0;
  const VALUE = 1;

  let arrObj = [];
  for(let key in data) {
    arrObj.push([ key, data[key] ]);
  }

  arrObj.forEach((e) => {
    if (Object.prototype.toString.call( e[VALUE] ) === '[object Object]') {
      treeTolist(arr, e[VALUE]);
    } else {
      arr.push([e[KEY], e[VALUE]]);
    }
  });
  return arr;
}

/**
*  Convert a object tree to a array of leaf
*  @param input - Object data
*  @returns output  - leaf array [key: value]
*/
function destructObj(input) {
  const arr = [];
  const output = treeTolist(arr, input);
  return output;
}

/**
*  Convert a array of leaf to a object tree
*  corresponding the specific schema.
*  @param leaf - leaf array
*  @param schema - specific schema
*  @param parent - root parent
*  @returns output  - Object with the structure of schema
*/
function constructObj(data, schema, parent) {
  const KEY = 0;
  const VALUE = 1;
  let node = {};
  schema
    .filter(s => s.parent === parent)
    .forEach((s) => {
      let a = [];
      if (data.find(e => e[KEY] === s.key)) {
        a = data.find(e => e[KEY] === s.key);
      }
      node[s.key] = typeof a[VALUE] !== 'undefined' ? a[VALUE] : constructObj(data, schema, s.key);
    });
  return node;
}

function normalizer(input, schema) {
  const leaf = destructObj(input);
  const tfschema = tf(schema);
  const output = constructObj(leaf, tfschema, null);
  return output;
}

module.exports = normalizer;
