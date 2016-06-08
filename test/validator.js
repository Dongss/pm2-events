import test from 'ava';
import validator from '../libs/validator';

test('init: should throw when param not a Function', t => {
    t.throws(() => validator.init('string'), 'string is not a function');
});

test('init: should throw when param not a Function', t => {
    t.is(validator.init(function(msg) {
        throw new Error(msg)    
    }), undefined);
});

test('isFunction: should throw when param not a Function', t => {
    t.throws(() => validator.isFunction('string'), 'string is not a function');
});

test('isFunction: should return true when param a Function', t => {
    t.truthy(validator.isFunction(function() {}));
});

test('isSocketFile: should throw when file is not socket', t => {
    t.throws(() => validator.isSocketFile('../index.js'), '../index.js file not exist or not socket');
});
