/**
  classNameTest - function which generate test to check css classes on component

  setup - function "setup" of component which need to test
  component - property name of object which "setup" function returns
  css - path to css file of tested component
  prop - property which pass to "setup" function
  value - value of this property
*/
export default ({setup, component, css, className, prop, value}) => t => {
  const components = setup({[prop]: value}, {[css]: {[className]: className}});
  t[value ? 'is' : 'not'](components[component].prop('className'), className);
};
