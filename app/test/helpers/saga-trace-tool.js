/**
 * Helps watch all executed steps with params
 *
 *  //code example
 *  test('hello', saga(HELLO,[
 *    'trace', <-- this
 *    does(put({type: 'action'})),
 *    does(take('action')),
 *    selects('text', {a: 'text'}),
 *    does(take('action'), 'wrong text')
 *  ]))
 *
 *  //output example
 *  ====== HELLO() =====
 *
 *  - 1: DOES    - TAKE['action']<>TAKE['action']
 *  - 2: DOES    - PUT['another action']<>PUT['another action']
 *  - 3: SELECTS - 'text'<>'wrong text'
 *
 * @param  {Function}  generator saga generator function
 * @param  {Boolean || String} isActive  turn on log in console,
 *  also show name of current active test
 * @return {Object} hash of methods
 */
export default (generator, isActive) => {
  const testName = typeof isActive === 'string' ? isActive : '';
  const body = String(generator);
  const arr = body.match(/function(.*?)\{/);
  const name = ((arr.length > 1 ? arr[1] : arr[0]) || '').trim();
  if (isActive) {
    console.log(`\n===== ${name.length > 2 ?
      name.replace('()', `(${testName})`) : 'someNestedSaga'} =====`);
  }
  return {
    isActive,
    parseSaga(saga) {
      const sagaId = '@@redux-saga/IO';
      const sagaKeys = Object.keys(saga);
      const isSaga = sagaKeys.some(el => el === sagaId);
      if (!isSaga) {
        return false;
      }
      const sagaName = sagaKeys.filter(el => el !== sagaId)[0];
      const sagaBody = saga[sagaName];
      return {
        name: sagaName,
        body: sagaBody,
        args: sagaBody.args
      };
    },
    getArgsByName(name, body) {
      switch (name) {
        case 'PUT':
          return body.action.type;
        case 'TAKE':
          return body.pattern;
        case 'CALL':
          return JSON.stringify(body.args, null, '  ').substr(0, 300);
        case 'RACE':
          return Object.keys(body);
        default:
          return;
      }
    },
    does(step, actual, c) {
      if (!this.isActive) {
        return;
      }
      const exp = this.parseSaga(step);
      const act = this.parseSaga(actual);
      const nameExp = exp && exp.name;
      const argsExp = this.getArgsByName(nameExp, exp.body, step);
      const nameAct = act && act.name;
      const argsAct = this.getArgsByName(nameAct, act.body, actual);
      if (c === 0) {
        console.log('\n');
      }
      console.log(
        `- ${c + 1}: DOES     - ${nameExp}[${argsExp}]` +
        `   ${nameAct}[${argsAct}]`
        );
    },
    selects(exp, act, c) {
      if (!this.isActive) {
        return;
      }
      const e = JSON.stringify(exp || 'undefined', null, '  ').substr(0, 300);
      const a = JSON.stringify(act || 'undefined', null, '  ').substr(0, 300);
      if (c === 0) {
        console.log('\n');
      }
      console.log(`- ${c + 1}: SELECTS  - ${e}<>${a} `);
    },
    requests(exp, act, args, c) {
      if (!this.isActive) {
        return;
      }
      const a = (act && act.method) || act;
      const e = (exp && exp.method) || exp;
      if (c === 0) {
        console.log('\n');
      }
      const ar = args ? JSON.stringify(args, null, '  ') : args;
      console.log(`- ${c + 1}: REQUESTS - ${e}<>${a} | [${ar}]`);
    },
    throws(c) {
      if (!this.isActive) {
        return;
      }
      if (c === 0) {
        console.log('\n');
      }
      console.log(`-> ${c + 1}: THROWS`);
    }
  };
};
