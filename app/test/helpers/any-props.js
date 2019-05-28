import R from 'ramda';

export default (setup, target, objOf = R.objOf('input')) => t => {
  const props = {a: 1, b: 2, c: 3};
  const components = setup(objOf(props));

  R.mapObjIndexed((value, key) =>
    t.is(components[target].prop(key), value), props);
};
