import test from 'ava';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

(process.env.CI ? test : test.skip)('should init without any issue', () => {
  proxyquire('./reredux', {});
});

(process.env.CI ? test : test.skip)('should use devToolsExtension', t => {
  window.devToolsExtension = sinon.stub().returns(o => o);
  proxyquire('./reredux', {});
  t.truthy(window.devToolsExtension.calledOnce);
});
