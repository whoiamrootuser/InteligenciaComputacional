'use strict';

const service = require('../lib/service');
const assert = require('assert').strict;

assert.strictEqual(service(), 'Hello from service');
console.info('service tests passed');
