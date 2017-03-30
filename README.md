# tree-normalizer
Object tree normalizer (transform structure of the tree)

## Install
```$ npm install tree-normalizer```

## Test
```$ npm run test```

## Usage
Tree-normalizer can transform the structure of two objects, for the following example:
```
user {                            user { 
  index: value,                     create: value,
  create: value,     <=====>        update: value,
  update: value,                    delete: value
  delete: value                   },
}                                 index: value
```
```
import normalizer from 'tree-normalizer';

const output = normalizer(input, schema);
```

## Example
```
import normalizer from 'tree-normalizer';

// schema example
const schema = {
  user: {
    create: null,
    update: null,
    delete: null
  },
  index: null
}

// input example
const input = {
  user: {
    index: true,
    create: true,
    update: true,
    delete: true
  }
};

console.log(JSON.stringify(
  normalizer(input, schema), null, 2
));

/* output
{
  "user": {
    "create": true,
    "update": true,
    "delete": true
  },
  "index": true
}
*/

```
