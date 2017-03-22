
function treeTolist(arr, data) {
  const KEY = 0;
  const VALUE = 1;

  let arrObj = [];
  for(let key in data) {
    arrObj.push([ key, data[key] ]);
  }

  arrObj.forEach((e) => {
    if (typeof e[VALUE] === 'object') {
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
  const output = constructObj(leaf, schema, null);
  return output;
}

module.exports = normalizer;
