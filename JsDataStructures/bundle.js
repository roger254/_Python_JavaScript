(function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {exports: {}};
                e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }

        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }

    return r
})()({
    1: [function (require, module, exports) {
        /* HashMaps has many names like
         * HashTable, HashMap, Map,
        * Dictionary, Associative Arrays
         */


// implementing a hash function
        class NaiveHashMap {
            constructor(initialCapacity = 2) {
                this.buckets = new Array(initialCapacity)
            }

            set(key, value) {
                const index = this.getIndex(key);
                this.buckets[index] = value;
            }

            get(key) {
                const index = this.getIndex(key);
                return this.buckets[index]
            }

            hash(key) {
                return key.toString().length;
            }

            getIndex(key) {
                const indexHash = this.hash(key);
                return indexHash % this.buckets.length
            }
        }

// Usage
        const assert = require('assert');
        const hashMap = new NaiveHashMap();
        hashMap.set('cat', 2);
        hashMap.set('rat', 7);
        hashMap.set('dog', 1);
        hashMap.set('art', 8);

        console.log(hashMap.buckets);
        console.log(assert.strictEqual(hashMap.get('art'), 8));
        assert.strictEqual(hashMap.get('cat'), 8);
        assert.strictEqual(hashMap.get('rat'), 8);
        assert.strictEqual(hashMap.get('dog'), 8);
    }, {"assert": 2}], 2: [function (require, module, exports) {
        (function (global) {
            'use strict';

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

            /*!
             * The buffer module from node.js, for the browser.
             *
             * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
             * @license  MIT
             */
            function compare(a, b) {
                if (a === b) {
                    return 0;
                }

                var x = a.length;
                var y = b.length;

                for (var i = 0, len = Math.min(x, y); i < len; ++i) {
                    if (a[i] !== b[i]) {
                        x = a[i];
                        y = b[i];
                        break;
                    }
                }

                if (x < y) {
                    return -1;
                }
                if (y < x) {
                    return 1;
                }
                return 0;
            }

            function isBuffer(b) {
                if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
                    return global.Buffer.isBuffer(b);
                }
                return !!(b != null && b._isBuffer);
            }

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

            var util = require('util/');
            var hasOwn = Object.prototype.hasOwnProperty;
            var pSlice = Array.prototype.slice;
            var functionsHaveNames = (function () {
                return function foo() {
                }.name === 'foo';
            }());

            function pToString(obj) {
                return Object.prototype.toString.call(obj);
            }

            function isView(arrbuf) {
                if (isBuffer(arrbuf)) {
                    return false;
                }
                if (typeof global.ArrayBuffer !== 'function') {
                    return false;
                }
                if (typeof ArrayBuffer.isView === 'function') {
                    return ArrayBuffer.isView(arrbuf);
                }
                if (!arrbuf) {
                    return false;
                }
                if (arrbuf instanceof DataView) {
                    return true;
                }
                if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
                    return true;
                }
                return false;
            }

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

            var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

            var regex = /\s*function\s+([^\(\s]*)\s*/;

// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
            function getName(func) {
                if (!util.isFunction(func)) {
                    return;
                }
                if (functionsHaveNames) {
                    return func.name;
                }
                var str = func.toString();
                var match = str.match(regex);
                return match && match[1];
            }

            assert.AssertionError = function AssertionError(options) {
                this.name = 'AssertionError';
                this.actual = options.actual;
                this.expected = options.expected;
                this.operator = options.operator;
                if (options.message) {
                    this.message = options.message;
                    this.generatedMessage = false;
                } else {
                    this.message = getMessage(this);
                    this.generatedMessage = true;
                }
                var stackStartFunction = options.stackStartFunction || fail;
                if (Error.captureStackTrace) {
                    Error.captureStackTrace(this, stackStartFunction);
                } else {
                    // non v8 browsers so we can have a stacktrace
                    var err = new Error();
                    if (err.stack) {
                        var out = err.stack;

                        // try to strip useless frames
                        var fn_name = getName(stackStartFunction);
                        var idx = out.indexOf('\n' + fn_name);
                        if (idx >= 0) {
                            // once we have located the function frame
                            // we need to strip out everything before it (and its line)
                            var next_line = out.indexOf('\n', idx + 1);
                            out = out.substring(next_line + 1);
                        }

                        this.stack = out;
                    }
                }
            };

// assert.AssertionError instanceof Error
            util.inherits(assert.AssertionError, Error);

            function truncate(s, n) {
                if (typeof s === 'string') {
                    return s.length < n ? s : s.slice(0, n);
                } else {
                    return s;
                }
            }

            function inspect(something) {
                if (functionsHaveNames || !util.isFunction(something)) {
                    return util.inspect(something);
                }
                var rawname = getName(something);
                var name = rawname ? ': ' + rawname : '';
                return '[Function' + name + ']';
            }

            function getMessage(self) {
                return truncate(inspect(self.actual), 128) + ' ' +
                    self.operator + ' ' +
                    truncate(inspect(self.expected), 128);
            }

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

            function fail(actual, expected, message, operator, stackStartFunction) {
                throw new assert.AssertionError({
                    message: message,
                    actual: actual,
                    expected: expected,
                    operator: operator,
                    stackStartFunction: stackStartFunction
                });
            }

// EXTENSION! allows for well behaved errors defined elsewhere.
            assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

            function ok(value, message) {
                if (!value) fail(value, true, message, '==', assert.ok);
            }

            assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

            assert.equal = function equal(actual, expected, message) {
                if (actual != expected) fail(actual, expected, message, '==', assert.equal);
            };

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

            assert.notEqual = function notEqual(actual, expected, message) {
                if (actual == expected) {
                    fail(actual, expected, message, '!=', assert.notEqual);
                }
            };

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

            assert.deepEqual = function deepEqual(actual, expected, message) {
                if (!_deepEqual(actual, expected, false)) {
                    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
                }
            };

            assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
                if (!_deepEqual(actual, expected, true)) {
                    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
                }
            };

            function _deepEqual(actual, expected, strict, memos) {
                // 7.1. All identical values are equivalent, as determined by ===.
                if (actual === expected) {
                    return true;
                } else if (isBuffer(actual) && isBuffer(expected)) {
                    return compare(actual, expected) === 0;

                    // 7.2. If the expected value is a Date object, the actual value is
                    // equivalent if it is also a Date object that refers to the same time.
                } else if (util.isDate(actual) && util.isDate(expected)) {
                    return actual.getTime() === expected.getTime();

                    // 7.3 If the expected value is a RegExp object, the actual value is
                    // equivalent if it is also a RegExp object with the same source and
                    // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
                } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
                    return actual.source === expected.source &&
                        actual.global === expected.global &&
                        actual.multiline === expected.multiline &&
                        actual.lastIndex === expected.lastIndex &&
                        actual.ignoreCase === expected.ignoreCase;

                    // 7.4. Other pairs that do not both pass typeof value == 'object',
                    // equivalence is determined by ==.
                } else if ((actual === null || typeof actual !== 'object') &&
                    (expected === null || typeof expected !== 'object')) {
                    return strict ? actual === expected : actual == expected;

                    // If both values are instances of typed arrays, wrap their underlying
                    // ArrayBuffers in a Buffer each to increase performance
                    // This optimization requires the arrays to have the same type as checked by
                    // Object.prototype.toString (aka pToString). Never perform binary
                    // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
                    // bit patterns are not identical.
                } else if (isView(actual) && isView(expected) &&
                    pToString(actual) === pToString(expected) &&
                    !(actual instanceof Float32Array ||
                        actual instanceof Float64Array)) {
                    return compare(new Uint8Array(actual.buffer),
                        new Uint8Array(expected.buffer)) === 0;

                    // 7.5 For all other Object pairs, including Array objects, equivalence is
                    // determined by having the same number of owned properties (as verified
                    // with Object.prototype.hasOwnProperty.call), the same set of keys
                    // (although not necessarily the same order), equivalent values for every
                    // corresponding key, and an identical 'prototype' property. Note: this
                    // accounts for both named and indexed properties on Arrays.
                } else if (isBuffer(actual) !== isBuffer(expected)) {
                    return false;
                } else {
                    memos = memos || {actual: [], expected: []};

                    var actualIndex = memos.actual.indexOf(actual);
                    if (actualIndex !== -1) {
                        if (actualIndex === memos.expected.indexOf(expected)) {
                            return true;
                        }
                    }

                    memos.actual.push(actual);
                    memos.expected.push(expected);

                    return objEquiv(actual, expected, strict, memos);
                }
            }

            function isArguments(object) {
                return Object.prototype.toString.call(object) == '[object Arguments]';
            }

            function objEquiv(a, b, strict, actualVisitedObjects) {
                if (a === null || a === undefined || b === null || b === undefined)
                    return false;
                // if one is a primitive, the other must be same
                if (util.isPrimitive(a) || util.isPrimitive(b))
                    return a === b;
                if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
                    return false;
                var aIsArgs = isArguments(a);
                var bIsArgs = isArguments(b);
                if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
                    return false;
                if (aIsArgs) {
                    a = pSlice.call(a);
                    b = pSlice.call(b);
                    return _deepEqual(a, b, strict);
                }
                var ka = objectKeys(a);
                var kb = objectKeys(b);
                var key, i;
                // having the same number of owned properties (keys incorporates
                // hasOwnProperty)
                if (ka.length !== kb.length)
                    return false;
                //the same set of keys (although not necessarily the same order),
                ka.sort();
                kb.sort();
                //~~~cheap key test
                for (i = ka.length - 1; i >= 0; i--) {
                    if (ka[i] !== kb[i])
                        return false;
                }
                //equivalent values for every corresponding key, and
                //~~~possibly expensive deep test
                for (i = ka.length - 1; i >= 0; i--) {
                    key = ka[i];
                    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
                        return false;
                }
                return true;
            }

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

            assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
                if (_deepEqual(actual, expected, false)) {
                    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
                }
            };

            assert.notDeepStrictEqual = notDeepStrictEqual;

            function notDeepStrictEqual(actual, expected, message) {
                if (_deepEqual(actual, expected, true)) {
                    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
                }
            }


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

            assert.strictEqual = function strictEqual(actual, expected, message) {
                if (actual !== expected) {
                    fail(actual, expected, message, '===', assert.strictEqual);
                }
            };

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

            assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
                if (actual === expected) {
                    fail(actual, expected, message, '!==', assert.notStrictEqual);
                }
            };

            function expectedException(actual, expected) {
                if (!actual || !expected) {
                    return false;
                }

                if (Object.prototype.toString.call(expected) == '[object RegExp]') {
                    return expected.test(actual);
                }

                try {
                    if (actual instanceof expected) {
                        return true;
                    }
                } catch (e) {
                    // Ignore.  The instanceof check doesn't work for arrow functions.
                }

                if (Error.isPrototypeOf(expected)) {
                    return false;
                }

                return expected.call({}, actual) === true;
            }

            function _tryBlock(block) {
                var error;
                try {
                    block();
                } catch (e) {
                    error = e;
                }
                return error;
            }

            function _throws(shouldThrow, block, expected, message) {
                var actual;

                if (typeof block !== 'function') {
                    throw new TypeError('"block" argument must be a function');
                }

                if (typeof expected === 'string') {
                    message = expected;
                    expected = null;
                }

                actual = _tryBlock(block);

                message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
                    (message ? ' ' + message : '.');

                if (shouldThrow && !actual) {
                    fail(actual, expected, 'Missing expected exception' + message);
                }

                var userProvidedMessage = typeof message === 'string';
                var isUnwantedException = !shouldThrow && util.isError(actual);
                var isUnexpectedException = !shouldThrow && actual && !expected;

                if ((isUnwantedException &&
                    userProvidedMessage &&
                    expectedException(actual, expected)) ||
                    isUnexpectedException) {
                    fail(actual, expected, 'Got unwanted exception' + message);
                }

                if ((shouldThrow && actual && expected &&
                    !expectedException(actual, expected)) || (!shouldThrow && actual)) {
                    throw actual;
                }
            }

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

            assert.throws = function (block, /*optional*/error, /*optional*/message) {
                _throws(true, block, error, message);
            };

// EXTENSION! This is annoying to write outside this module.
            assert.doesNotThrow = function (block, /*optional*/error, /*optional*/message) {
                _throws(false, block, error, message);
            };

            assert.ifError = function (err) {
                if (err) throw err;
            };

            var objectKeys = Object.keys || function (obj) {
                var keys = [];
                for (var key in obj) {
                    if (hasOwn.call(obj, key)) keys.push(key);
                }
                return keys;
            };

        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"util/": 5}], 3: [function (require, module, exports) {
        if (typeof Object.create === 'function') {
            // implementation from standard node.js 'util' module
            module.exports = function inherits(ctor, superCtor) {
                ctor.super_ = superCtor
                ctor.prototype = Object.create(superCtor.prototype, {
                    constructor: {
                        value: ctor,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
            };
        } else {
            // old school shim for old browsers
            module.exports = function inherits(ctor, superCtor) {
                ctor.super_ = superCtor
                var TempCtor = function () {
                }
                TempCtor.prototype = superCtor.prototype
                ctor.prototype = new TempCtor()
                ctor.prototype.constructor = ctor
            }
        }

    }, {}], 4: [function (require, module, exports) {
        module.exports = function isBuffer(arg) {
            return arg && typeof arg === 'object'
                && typeof arg.copy === 'function'
                && typeof arg.fill === 'function'
                && typeof arg.readUInt8 === 'function';
        }
    }, {}], 5: [function (require, module, exports) {
        (function (process, global) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

            var formatRegExp = /%[sdj%]/g;
            exports.format = function (f) {
                if (!isString(f)) {
                    var objects = [];
                    for (var i = 0; i < arguments.length; i++) {
                        objects.push(inspect(arguments[i]));
                    }
                    return objects.join(' ');
                }

                var i = 1;
                var args = arguments;
                var len = args.length;
                var str = String(f).replace(formatRegExp, function (x) {
                    if (x === '%%') return '%';
                    if (i >= len) return x;
                    switch (x) {
                        case '%s':
                            return String(args[i++]);
                        case '%d':
                            return Number(args[i++]);
                        case '%j':
                            try {
                                return JSON.stringify(args[i++]);
                            } catch (_) {
                                return '[Circular]';
                            }
                        default:
                            return x;
                    }
                });
                for (var x = args[i]; i < len; x = args[++i]) {
                    if (isNull(x) || !isObject(x)) {
                        str += ' ' + x;
                    } else {
                        str += ' ' + inspect(x);
                    }
                }
                return str;
            };


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
            exports.deprecate = function (fn, msg) {
                // Allow for deprecating things in the process of starting up.
                if (isUndefined(global.process)) {
                    return function () {
                        return exports.deprecate(fn, msg).apply(this, arguments);
                    };
                }

                if (process.noDeprecation === true) {
                    return fn;
                }

                var warned = false;

                function deprecated() {
                    if (!warned) {
                        if (process.throwDeprecation) {
                            throw new Error(msg);
                        } else if (process.traceDeprecation) {
                            console.trace(msg);
                        } else {
                            console.error(msg);
                        }
                        warned = true;
                    }
                    return fn.apply(this, arguments);
                }

                return deprecated;
            };


            var debugs = {};
            var debugEnviron;
            exports.debuglog = function (set) {
                if (isUndefined(debugEnviron))
                    debugEnviron = process.env.NODE_DEBUG || '';
                set = set.toUpperCase();
                if (!debugs[set]) {
                    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
                        var pid = process.pid;
                        debugs[set] = function () {
                            var msg = exports.format.apply(exports, arguments);
                            console.error('%s %d: %s', set, pid, msg);
                        };
                    } else {
                        debugs[set] = function () {
                        };
                    }
                }
                return debugs[set];
            };


            /**
             * Echos the value of a value. Trys to print the value out
             * in the best way possible given the different types.
             *
             * @param {Object} obj The object to print out.
             * @param {Object} opts Optional options object that alters the output.
             */

            /* legacy: obj, showHidden, depth, colors*/
            function inspect(obj, opts) {
                // default options
                var ctx = {
                    seen: [],
                    stylize: stylizeNoColor
                };
                // legacy...
                if (arguments.length >= 3) ctx.depth = arguments[2];
                if (arguments.length >= 4) ctx.colors = arguments[3];
                if (isBoolean(opts)) {
                    // legacy...
                    ctx.showHidden = opts;
                } else if (opts) {
                    // got an "options" object
                    exports._extend(ctx, opts);
                }
                // set default options
                if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
                if (isUndefined(ctx.depth)) ctx.depth = 2;
                if (isUndefined(ctx.colors)) ctx.colors = false;
                if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
                if (ctx.colors) ctx.stylize = stylizeWithColor;
                return formatValue(ctx, obj, ctx.depth);
            }

            exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
            inspect.colors = {
                'bold': [1, 22],
                'italic': [3, 23],
                'underline': [4, 24],
                'inverse': [7, 27],
                'white': [37, 39],
                'grey': [90, 39],
                'black': [30, 39],
                'blue': [34, 39],
                'cyan': [36, 39],
                'green': [32, 39],
                'magenta': [35, 39],
                'red': [31, 39],
                'yellow': [33, 39]
            };

// Don't use 'blue' not visible on cmd.exe
            inspect.styles = {
                'special': 'cyan',
                'number': 'yellow',
                'boolean': 'yellow',
                'undefined': 'grey',
                'null': 'bold',
                'string': 'green',
                'date': 'magenta',
                // "name": intentionally not styling
                'regexp': 'red'
            };


            function stylizeWithColor(str, styleType) {
                var style = inspect.styles[styleType];

                if (style) {
                    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
                        '\u001b[' + inspect.colors[style][1] + 'm';
                } else {
                    return str;
                }
            }


            function stylizeNoColor(str, styleType) {
                return str;
            }


            function arrayToHash(array) {
                var hash = {};

                array.forEach(function (val, idx) {
                    hash[val] = true;
                });

                return hash;
            }


            function formatValue(ctx, value, recurseTimes) {
                // Provide a hook for user-specified inspect functions.
                // Check that value is an object with an inspect function on it
                if (ctx.customInspect &&
                    value &&
                    isFunction(value.inspect) &&
                    // Filter out the util module, it's inspect function is special
                    value.inspect !== exports.inspect &&
                    // Also filter out any prototype objects using the circular check.
                    !(value.constructor && value.constructor.prototype === value)) {
                    var ret = value.inspect(recurseTimes, ctx);
                    if (!isString(ret)) {
                        ret = formatValue(ctx, ret, recurseTimes);
                    }
                    return ret;
                }

                // Primitive types cannot have properties
                var primitive = formatPrimitive(ctx, value);
                if (primitive) {
                    return primitive;
                }

                // Look up the keys of the object.
                var keys = Object.keys(value);
                var visibleKeys = arrayToHash(keys);

                if (ctx.showHidden) {
                    keys = Object.getOwnPropertyNames(value);
                }

                // IE doesn't make error fields non-enumerable
                // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
                if (isError(value)
                    && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
                    return formatError(value);
                }

                // Some type of object without properties can be shortcutted.
                if (keys.length === 0) {
                    if (isFunction(value)) {
                        var name = value.name ? ': ' + value.name : '';
                        return ctx.stylize('[Function' + name + ']', 'special');
                    }
                    if (isRegExp(value)) {
                        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
                    }
                    if (isDate(value)) {
                        return ctx.stylize(Date.prototype.toString.call(value), 'date');
                    }
                    if (isError(value)) {
                        return formatError(value);
                    }
                }

                var base = '', array = false, braces = ['{', '}'];

                // Make Array say that they are Array
                if (isArray(value)) {
                    array = true;
                    braces = ['[', ']'];
                }

                // Make functions say that they are functions
                if (isFunction(value)) {
                    var n = value.name ? ': ' + value.name : '';
                    base = ' [Function' + n + ']';
                }

                // Make RegExps say that they are RegExps
                if (isRegExp(value)) {
                    base = ' ' + RegExp.prototype.toString.call(value);
                }

                // Make dates with properties first say the date
                if (isDate(value)) {
                    base = ' ' + Date.prototype.toUTCString.call(value);
                }

                // Make error with message first say the error
                if (isError(value)) {
                    base = ' ' + formatError(value);
                }

                if (keys.length === 0 && (!array || value.length == 0)) {
                    return braces[0] + base + braces[1];
                }

                if (recurseTimes < 0) {
                    if (isRegExp(value)) {
                        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
                    } else {
                        return ctx.stylize('[Object]', 'special');
                    }
                }

                ctx.seen.push(value);

                var output;
                if (array) {
                    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
                } else {
                    output = keys.map(function (key) {
                        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
                    });
                }

                ctx.seen.pop();

                return reduceToSingleString(output, base, braces);
            }


            function formatPrimitive(ctx, value) {
                if (isUndefined(value))
                    return ctx.stylize('undefined', 'undefined');
                if (isString(value)) {
                    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                        .replace(/'/g, "\\'")
                        .replace(/\\"/g, '"') + '\'';
                    return ctx.stylize(simple, 'string');
                }
                if (isNumber(value))
                    return ctx.stylize('' + value, 'number');
                if (isBoolean(value))
                    return ctx.stylize('' + value, 'boolean');
                // For some reason typeof null is "object", so special case here.
                if (isNull(value))
                    return ctx.stylize('null', 'null');
            }


            function formatError(value) {
                return '[' + Error.prototype.toString.call(value) + ']';
            }


            function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
                var output = [];
                for (var i = 0, l = value.length; i < l; ++i) {
                    if (hasOwnProperty(value, String(i))) {
                        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                            String(i), true));
                    } else {
                        output.push('');
                    }
                }
                keys.forEach(function (key) {
                    if (!key.match(/^\d+$/)) {
                        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                            key, true));
                    }
                });
                return output;
            }


            function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
                var name, str, desc;
                desc = Object.getOwnPropertyDescriptor(value, key) || {value: value[key]};
                if (desc.get) {
                    if (desc.set) {
                        str = ctx.stylize('[Getter/Setter]', 'special');
                    } else {
                        str = ctx.stylize('[Getter]', 'special');
                    }
                } else {
                    if (desc.set) {
                        str = ctx.stylize('[Setter]', 'special');
                    }
                }
                if (!hasOwnProperty(visibleKeys, key)) {
                    name = '[' + key + ']';
                }
                if (!str) {
                    if (ctx.seen.indexOf(desc.value) < 0) {
                        if (isNull(recurseTimes)) {
                            str = formatValue(ctx, desc.value, null);
                        } else {
                            str = formatValue(ctx, desc.value, recurseTimes - 1);
                        }
                        if (str.indexOf('\n') > -1) {
                            if (array) {
                                str = str.split('\n').map(function (line) {
                                    return '  ' + line;
                                }).join('\n').substr(2);
                            } else {
                                str = '\n' + str.split('\n').map(function (line) {
                                    return '   ' + line;
                                }).join('\n');
                            }
                        }
                    } else {
                        str = ctx.stylize('[Circular]', 'special');
                    }
                }
                if (isUndefined(name)) {
                    if (array && key.match(/^\d+$/)) {
                        return str;
                    }
                    name = JSON.stringify('' + key);
                    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                        name = name.substr(1, name.length - 2);
                        name = ctx.stylize(name, 'name');
                    } else {
                        name = name.replace(/'/g, "\\'")
                            .replace(/\\"/g, '"')
                            .replace(/(^"|"$)/g, "'");
                        name = ctx.stylize(name, 'string');
                    }
                }

                return name + ': ' + str;
            }


            function reduceToSingleString(output, base, braces) {
                var numLinesEst = 0;
                var length = output.reduce(function (prev, cur) {
                    numLinesEst++;
                    if (cur.indexOf('\n') >= 0) numLinesEst++;
                    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
                }, 0);

                if (length > 60) {
                    return braces[0] +
                        (base === '' ? '' : base + '\n ') +
                        ' ' +
                        output.join(',\n  ') +
                        ' ' +
                        braces[1];
                }

                return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
            }


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
            function isArray(ar) {
                return Array.isArray(ar);
            }

            exports.isArray = isArray;

            function isBoolean(arg) {
                return typeof arg === 'boolean';
            }

            exports.isBoolean = isBoolean;

            function isNull(arg) {
                return arg === null;
            }

            exports.isNull = isNull;

            function isNullOrUndefined(arg) {
                return arg == null;
            }

            exports.isNullOrUndefined = isNullOrUndefined;

            function isNumber(arg) {
                return typeof arg === 'number';
            }

            exports.isNumber = isNumber;

            function isString(arg) {
                return typeof arg === 'string';
            }

            exports.isString = isString;

            function isSymbol(arg) {
                return typeof arg === 'symbol';
            }

            exports.isSymbol = isSymbol;

            function isUndefined(arg) {
                return arg === void 0;
            }

            exports.isUndefined = isUndefined;

            function isRegExp(re) {
                return isObject(re) && objectToString(re) === '[object RegExp]';
            }

            exports.isRegExp = isRegExp;

            function isObject(arg) {
                return typeof arg === 'object' && arg !== null;
            }

            exports.isObject = isObject;

            function isDate(d) {
                return isObject(d) && objectToString(d) === '[object Date]';
            }

            exports.isDate = isDate;

            function isError(e) {
                return isObject(e) &&
                    (objectToString(e) === '[object Error]' || e instanceof Error);
            }

            exports.isError = isError;

            function isFunction(arg) {
                return typeof arg === 'function';
            }

            exports.isFunction = isFunction;

            function isPrimitive(arg) {
                return arg === null ||
                    typeof arg === 'boolean' ||
                    typeof arg === 'number' ||
                    typeof arg === 'string' ||
                    typeof arg === 'symbol' ||  // ES6 symbol
                    typeof arg === 'undefined';
            }

            exports.isPrimitive = isPrimitive;

            exports.isBuffer = require('./support/isBuffer');

            function objectToString(o) {
                return Object.prototype.toString.call(o);
            }


            function pad(n) {
                return n < 10 ? '0' + n.toString(10) : n.toString(10);
            }


            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
            function timestamp() {
                var d = new Date();
                var time = [pad(d.getHours()),
                    pad(d.getMinutes()),
                    pad(d.getSeconds())].join(':');
                return [d.getDate(), months[d.getMonth()], time].join(' ');
            }


// log is just a thin wrapper to console.log that prepends a timestamp
            exports.log = function () {
                console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
            };


            /**
             * Inherit the prototype methods from one constructor into another.
             *
             * The Function.prototype.inherits from lang.js rewritten as a standalone
             * function (not on Function.prototype). NOTE: If this file is to be loaded
             * during bootstrapping this function needs to be rewritten using some native
             * functions as prototype setup using normal JavaScript does not work as
             * expected during bootstrapping (see mirror.js in r114903).
             *
             * @param {function} ctor Constructor function which needs to inherit the
             *     prototype.
             * @param {function} superCtor Constructor function to inherit prototype from.
             */
            exports.inherits = require('inherits');

            exports._extend = function (origin, add) {
                // Don't do anything if add isn't an object
                if (!add || !isObject(add)) return origin;

                var keys = Object.keys(add);
                var i = keys.length;
                while (i--) {
                    origin[keys[i]] = add[keys[i]];
                }
                return origin;
            };

            function hasOwnProperty(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            }

        }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"./support/isBuffer": 4, "_process": 6, "inherits": 3}], 6: [function (require, module, exports) {
// shim for using process in browser
        var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

        var cachedSetTimeout;
        var cachedClearTimeout;

        function defaultSetTimout() {
            throw new Error('setTimeout has not been defined');
        }

        function defaultClearTimeout() {
            throw new Error('clearTimeout has not been defined');
        }

        (function () {
            try {
                if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                } else {
                    cachedSetTimeout = defaultSetTimout;
                }
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                } else {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }())

        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
                //normal enviroments in sane situations
                return setTimeout(fun, 0);
            }
            // if setTimeout wasn't available but was latter defined
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }


        }

        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
                //normal enviroments in sane situations
                return clearTimeout(marker);
            }
            // if clearTimeout wasn't available but was latter defined
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                    // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                    return cachedClearTimeout.call(this, marker);
                }
            }


        }

        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;

        function cleanUpNextTick() {
            if (!draining || !currentQueue) {
                return;
            }
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }

        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;

            var len = queue.length;
            while (len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
        }

        process.nextTick = function (fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
                runTimeout(drainQueue);
            }
        };

// v8 likes predictible objects
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }

        Item.prototype.run = function () {
            this.fun.apply(null, this.array);
        };
        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = ''; // empty string to avoid regexp issues
        process.versions = {};

        function noop() {
        }

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;

        process.listeners = function (name) {
            return []
        }

        process.binding = function (name) {
            throw new Error('process.binding is not supported');
        };

        process.cwd = function () {
            return '/'
        };
        process.chdir = function (dir) {
            throw new Error('process.chdir is not supported');
        };
        process.umask = function () {
            return 0;
        };

    }, {}]
}, {}, [1]);
