import test from 'ava';
import sinon from 'sinon';
import {setItem, getItem, clear, valueOf, saveObject, setJson, getJson}
  from './localstorage';

const ls = {
  setItem,
  getItem,
  clear,
  valueOf
};

function CreateMusicMock() {
  this.d = 'Deep Purple';
  this.m = 'Metallica';
}

CreateMusicMock.prototype.k = 'Kirkorov';

const mockObj = new CreateMusicMock();

test('Check setItem', t => {
  const args = ['name', 'Adam'];
  sinon.spy(ls, 'setItem');
  ls.setItem(...args);
  t.truthy(ls.setItem.calledOnce);
  t.deepEqual(ls.setItem.args[0], args);
  ls.setItem.restore();
});

test('Check getItem', t => {
  const store = {name: 'Daniel'};
  sinon.spy(ls, 'getItem');
  ls.getItem(store.name);
  t.truthy(ls.getItem.calledOnce);
  t.deepEqual(ls.getItem.args[0][0], store.name);
  ls.getItem.restore();
});

test('Check clear', t => {
  const name = 'Adam';
  ls.setItem('name', name);
  ls.clear();
  t.deepEqual(ls.getItem('name'), null);
});

test('Check valueOf', t => {
  const name = 'Adam';
  ls.clear();
  ls.setItem('name', name);
  const state = ls.valueOf();
  t.deepEqual(state.length, 1);
});

test('Check saving object to localStorage', t => {
  saveObject(mockObj);
  Object.keys(mockObj)
    .forEach(key => t.is(String(mockObj[key]), ls.getItem(key)));
  t.not(mockObj.k, ls.getItem('k'));
});

test('Check saving object like JSON to localStorage', t => {
  setJson('someJson', mockObj);
  const string = getItem('someJson');
  t.is(string, JSON.stringify(mockObj));
});
test('Check getting object like JSON from localStorage', t => {
  setJson('someJson', mockObj);
  const newMockObj = getJson('someJson');
  t.deepEqual({...mockObj}, newMockObj);
  Object.keys({...mockObj})
  .forEach(key => t.is(mockObj[key], newMockObj[key]));
});
