const normalizer = require('../lib/app');
const assert = require('assert');

console.log('test-1 starting');

// schema example
const schema_1 = {
  user: {
    create: null,
    update: null,
    delete: null
  },
  index: null
};

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
  user: {
    create: true,
    update: true,
    delete: true
  },
  index: true
};

assert.deepStrictEqual(actual_1, expect_1);
console.log('test1 ok!');

console.log('test-2 starting');

// schema example
const schema_2 = {
  user: {
    index: null,
    create: null,
    update: null,
    delete: null
  }
};

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
  user: {
    index: true,
    create: true,
    update: true,
    delete: true
  }
};

assert.deepStrictEqual(actual_2, expect_2);
console.log('test2: revert, ok!');

console.log('test-3 starting');

// schema example
const schema_3 = {
  user: {
    create: null,
    update: null
  },
  index: null,
  delete: [
    {
      id: null,
      age: { k: null, b: null }
    },
    {
      idx: null,
      agex: null
    }
  ]
};

// input example
const data_3 = {
  user: {
    index: true,
    create: true,
    update: true,
    delete: [
      {
        id: 1,
        age: { k: 12, b: 0 }
      },
      {
        idx: 2,
        agex: 12
      }
    ]
  }
};

const actual_3 = normalizer(data_3, schema_3);

const expect_3 = {
  user: {
    create: true,
    update: true
  },
  index: true,
  delete: [
    {
      id: 1,
      age: { k: 12, b: 0 }
    },
    {
      idx: 2,
      agex: 12
    }
  ]
};

assert.deepStrictEqual(actual_3, expect_3);
console.log('test3: value contain array, ok!');

console.log('test-4 starting');

const data_4 = {
  order: {
    index: false,
    paymentStatus: true,
    shipmentStatus: true,
    status: true,
    create: true,
    export: true
  },
  product: {
    index: false,
    create: true,
    update: true,
    remove: true,
    cost: true,
    export: true
  }
};

const schema_4 = {
  order: {
    index: null,
    options: {
      create: null,
      export: null,
      paymentStatus: null,
      shipmentStatus: null,
      status: null
    }
  },
  product: {
    index: null,
    options: {
      cost: null,
      create: null,
      export: null,
      remove: null,
      update: null
    }
  }
};

const actual_4 = normalizer(data_4, schema_4);

const expect_4 = {
  order: {
    index: true,
    options: {
      create: true,
      export: true,
      paymentStatus: true,
      shipmentStatus: true,
      status: true
    }
  },
  product: {
    index: false,
    options: {
      cost: true,
      create: true,
      export: true,
      remove: true,
      update: true
    }
  }
};
console.log(JSON.stringify(actual_4, null, 2));
assert.deepStrictEqual(actual_4, expect_4);
console.log('test4: ok!');
