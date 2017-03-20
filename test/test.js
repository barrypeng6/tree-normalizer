const normalizer = require("../lib/app");
const assert = require('assert');

console.log('test-1 starting');

// schema example
const schema_1 = [
  { key: 'user', parent: null },
  { key: 'index', parent: null },
  { key: 'create', parent: 'user' },
  { key: 'update', parent: 'user' },
  { key: 'delete', parent: 'user' }
];

// input example
const data_1 = {
  user: {
    index: true,
    create: true,
    update: true,
    delete: true
  }
};

const actual_1 = normalizer(data_1, schema_1);

const expect_1 = {
  "user": {
    "create": true,
    "update": true,
    "delete": true
  },
  "index": true
}

assert.deepStrictEqual(actual_1, expect_1);
console.log('test1 ok!');

console.log('test-2 starting');

// schema example
const schema_2 = [
  { key: 'user', parent: null },
  { key: 'index', parent: 'user' },
  { key: 'create', parent: 'user' },
  { key: 'update', parent: 'user' },
  { key: 'delete', parent: 'user' }
];

// input example
const data_2 = {
  index: true,
  user: {
    create: true,
    update: true,
    delete: true
  }
};

const actual_2 = normalizer(data_2, schema_2);
const expect_2 = {
  "user": {
    "index": true,
    "create": true,
    "update": true,
    "delete": true
  }
}

assert.deepStrictEqual(actual_2, expect_2);
console.log('test2: revert, ok!');
