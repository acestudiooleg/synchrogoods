import sinon from 'sinon';

export const genStub = ({
  returns = Promise.resolve()
} = {}) => {
  const agent = returns;
  agent.query = sinon.stub().returns(agent);
  agent.send = sinon.stub().returns(agent);
  return sinon.stub().returns(agent);
};

export const get = genStub();
export const post = genStub();
export const put = genStub();
export const del = genStub();

export default {get, post, put, del};
