'use strict';

const webapp = require('..');
const assert = require('assert').strict;

assert.strictEqual(webapp(), 'Hello from webapp');
console.info('webapp tests passed');
