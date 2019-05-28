import R from 'ramda';
/**
  presenceTest - function which check component visibility inside pseudo DOM

  setup - function "setup" of component which need to test
  properties - properties which pass to "setup" function
*/
export default (setup, props = {}) => t =>
  R.mapObjIndexed((component, name) =>
    t.truthy(component.length > 0, name), setup(props));
