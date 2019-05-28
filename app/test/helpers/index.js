import R from 'ramda';
import {html} from 'js-beautify';
import vardiff from 'variable-diff';

const attr = dataName => `[data-name="${dataName}"]`;

export const find = R.curry((dataName, holder) => holder.find(attr(dataName)));

const doesNotExistMsg = (dataName, holder) => `
${attr(dataName)} does not exist in document:
${html(holder.html())}`;

export const exists = dataName => (t, {holder}) =>
  t.truthy(find(dataName, holder).length, doesNotExistMsg(dataName, holder));

export const containText = text => (t, {holder}) =>
  t.truthy(new RegExp(text, 'gi').test(holder.html()));

export const doesNotContainText = text => (t, {holder}) =>
  t.falsy(new RegExp(text, 'gi').test(holder.html()));

const existsMsg = (dataName, holder) => `
${attr(dataName)} exists in document:
${html(holder.html())}`;

export const doesNotExist = dataName => (t, {holder}) =>
  t.falsy(find(dataName, holder).length, existsMsg(dataName, holder));
export const deepEqual = (expected, actual, message) => t => {
  const r = vardiff(expected, actual);
  if (r.changed) {
    console.log('========== DIFF ===========');
    console.log(r.text);
    console.log('===========================');
  }
  return t.deepEqual(expected, actual, message);
};
