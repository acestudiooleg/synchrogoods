import traceTool from './saga-trace-tool.js';
 /**
 *
 * (*1*)
 * - value for method of generator - next(arg), throw(arg)
 * also it is result of assignment yield to variable for
 * next interation of generator
 *
 *  function* gen(){
 *    // TO ===>
 *    let x = yield 10;
 *    console.log(x) // x == 20
 *  }
 *  let i= gen();
 *  let x = i.next().value; // x == 10
 *
 *  //**MAGIC**
 *  let arg = x + 10;
 *  i.next( arg ) // FROM ===>
 *
 *
 * (*2*)
 *
 * @return {Function}
 *    @param {Object} gen - generator
 *    @param {Object} t - ava test object
 *    @param {Funcion} next
 *      - method of generator - next|throw
*/

export const loggerHelper = (turnOn, fullMessage) => (step, obj) => {
  if (!turnOn) {
    return;
  }
  const key = Object.keys(obj)[0];
  const message = JSON.stringify(obj[key], null, '\t');
  const cutMessage = fullMessage ?
    message : (message || '').substr(0, 300) + '... <--CUT';
  console.log(` Result of "${step}"`);
  console.log('====================');
  console.log(`   ${key}:`, cutMessage);
  console.log('--------------------\n');
};

/**
 * Execute tests step-by-step
 *
 *    saga(sagaGenerator, [
 *      take('action'), call(http, '/google')
 *    ])
 *
 * @param  {Function} f saga generator function
 * @param  {Array} steps
 *  - every step has test like yuild in original generator
 * @return {Function}
 *    @param  {Object} t - object of ava for assertions
 */
export const saga = (f, steps, ...args) => t => {
  const maybeTrace = steps[0];
  let isTrace = false;
  if (typeof maybeTrace === 'string' && maybeTrace === 'trace') {
    isTrace = true;
    steps = steps.slice(1, steps.length + 1);
  }
  const traceObj = traceTool(f, isTrace);

  const gen = f(...args);
  steps.forEach((step, i) => {
    step(gen, t, undefined, {c: i, traceObj});
  });
};

/**
 * Pass argument to generator, useful if test end on some step and need finish
 * @param  {[type]} arg *1
 * @return {Function} *2
 */
export const passPrev = arg => (gen, t, next = 'next') => gen[next](arg);

/**
 * Execute deepEqual test between value from generator
 * and passed param
 *
 * @param  {[type]} step - from array of tests
 * @param  {[type]} arg *1
 * @return {Function} *2
 */
export const does = (step, arg) =>
  (gen, t, next = 'next', {c, traceObj}) => {
    const actual = gen[next](arg).value;
    traceObj.does(step, actual, c);
    t.deepEqual(actual, step);
  };

export const ends = arg => (gen, t, next = 'next') =>
  t.truthy(gen[next](arg).done);
/**
 * Helper for Saga's effect select
 * @param  {[type]} item - part of redux store
 * @param  {[type]} state full redux store
 * @param  {[type]} arg *1
 * @return {Function} *2
 */
export const selects = (item, state, arg) =>
  (gen, t, next = 'next', {c, traceObj}) => {
    const step = gen[next](arg).value;
    t.truthy(step.SELECT.selector instanceof Function);
    const result = step.SELECT.selector(state);
    traceObj.selects(result, item, c);
    t.deepEqual(result, item);
  };

/**
 * Helper for http request "trash"
 * @param  {Function} request - trash('xname',{})
 * @param  {[type]} arg)    [description]
 * @param  {[type]} arg *1
 * @return {Function} *2
 */
export const requests = (request, arg) =>
  (gen, t, next = 'next', {c, traceObj}) => {
    const step = gen[next](arg).value;
    t.truthy(step.CALL.fn);
    traceObj.requests(step.CALL.fn, request, arg, c);
    ['method', 'path', 'query', 'body'].forEach(prop => {
      t.deepEqual(step.CALL.fn[prop], request[prop]);
    });
  };

export const throws = stepFn => (gen, t, x, {c, traceObj}) => {
  traceObj.throws(c);
  stepFn(gen, t, 'throw', {c, traceObj});
};
