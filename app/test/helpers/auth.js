import moment from 'moment';
import jwt from 'jsonwebtoken';

export const generateToken = (valid, wrong, withoutExp) => {
  const exp = valid ?
  moment().add(10, 'days').unix() :
  moment().subtract(10, 'days').unix();
  const data = withoutExp ? {a: 'b'} : {exp};

  if (wrong === 'empty') {
    return null;
  }

  if (wrong) {
    return wrong;
  }

  return jwt.sign(data, '12345');
};
