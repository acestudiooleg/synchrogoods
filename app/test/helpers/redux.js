import R from 'ramda';
import React from 'react';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import * as enzyme from 'enzyme';

import reducers from 'src/reducers';

export const store = createStore(reducers);

export const mount = (child, defaultStore = store) => enzyme.mount(
  <Provider store={defaultStore}>
    <HashRouter>
      {child}
    </HashRouter>
  </Provider>
);

export const connectedComponent = component => t => {
  t.truthy(component.WrappedComponent instanceof Function);
};

const getRouter = (holder, containerName) => {
  if (containerName && holder.find(containerName).length > 0) {
    const {history, push, match} = holder.find(containerName).props();
    return {history, push, match};
  }
};

const transitionTo = (path, router) => {
  if (location.hash.replace(/^#/, '') !== path) {
    router.history.push(path);
  }
};

export const reduxSetup = cmpn => (props = {}, actions = [], path = '/') => {
  let holder;

  const [actionsBefore, actionsAfter] = R.splitWhen(R.is(String), actions);

  actionsBefore.forEach(action => store.dispatch(action));

  const cmpnName = props.connectRouterTo ? props.connectRouterTo : cmpn().props.connectRouterTo;
  holder = mount(cmpn(props));
  const router = getRouter(holder, cmpnName);
  const oldHash = location.hash;

  actionsAfter.forEach(action => action.type ?
    store.dispatch(action) :
    transitionTo(action, router)
  );

  if (R.isEmpty(actionsAfter)) {
    transitionTo(path, router);
  }

  if (oldHash !== location.hash) {
    // we have to rerender it after we apply new path
    holder = mount(cmpn(props));
  }

  const state = store.getState();
  return {holder, router, state, store};
};

export const reduxTestSequence = (cmpn, steps = [], newStore = false, cmpnName) =>
  async t => {
    if (!R.any(R.is(Function), steps)) {
      t.fail(`You have to pass test functions to the list of steps when
        using reduxTestSetup`);
      return;
    }
    let router;
    let holder;
    const storeToUse = newStore ? createStore(reducers) : store;
    /* eslint-disable no-return-assign */
    const render = () => {
      holder = mount(cmpn(), storeToUse);
      router = getRouter(holder, cmpnName);
    };
    /* eslint-disable babel/no-await-in-loop */
    for (const step of steps) {
      switch (R.type(step)) {
        case 'Function':
          if (!step.immediately) {
            render();
          }
          await step(t, {
            holder,
            router,
            state: storeToUse.getState(),
            store: storeToUse
          });
          break;
        case 'Object':
          storeToUse.dispatch(step);
          break;
        case 'String':
          if (!router) {
            render();
          }
          transitionTo(step, router);
          break;
        default:
      }
    }
  };

reduxTestSequence.immediately = fn => {
  fn.immediately = true;
  return fn;
};
