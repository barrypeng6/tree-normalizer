import { normalizer } from '../../tree-normalizer';

// output example
const schema = [
  { key: 'user', parent: null },
  { key: 'index', parent: 'user' },
  { key: 'create', parent: 'user' },
  { key: 'update', parent: 'user' },
  { key: 'delete', parent: 'user' }
];

// input example
const data = {
  user: {
    index: true,
    options: {
      create: true,
      update: true,
      delete: true
    }
  }
};

console.log(JSON.stringify(
  normalizer(data, schema), null, 2
));

/*
{
  "user": {
    "index": true,
    "create": true,
    "update": true,
    "delete": true
  }
}
*/
