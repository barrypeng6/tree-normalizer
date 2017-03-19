# tree-normalizer
Object tree normalizer (transform structure of the tree) 

## Installation
```$ npm install tree-normalizer```

## Usage

```
import {normalizer} from 'tree-normalizer';

// schema example
const schema = [
  { key: 'user', parent: null },
  { key: 'index', parent: null },
  { key: 'create', parent: 'user' },
  { key: 'update', parent: 'user' },
  { key: 'delete', parent: 'user' }
];

// input example
const data = {
  user: {
    index: true,
    create: true,
    update: true,
    delete: true
  }
};

console.log(JSON.stringify(
  normalizer(data, schema), null, 2
));

/*
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
