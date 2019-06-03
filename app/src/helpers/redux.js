/* eslint-disable no-console */
export const makeAction = type => payload => ({ type, payload });

export const withList = handler => (item = {}, state = {}) => {
  if (!item.payload) {
    console.error('Payload is missing');
  }

  if (!state.list) {
    console.error('List is missing');
  }
  const list = handler(item.payload || {}, state.list || []);
  return { list };
};
