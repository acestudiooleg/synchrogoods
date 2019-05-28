import test from 'ava';
import pure from 'src/decorators/pure';

test('pure', t => {
  const TestClass = class {};
  const DecoratedTestClass = pure(TestClass);

  const instance = new TestClass();
  t.falsy(instance.shouldComponentUpdate);

  const decoratedInstance = new DecoratedTestClass();
  t.truthy(decoratedInstance.shouldComponentUpdate);
});
