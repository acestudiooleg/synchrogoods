const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const required = {
  message: 'Required',
  validator: (value = '') => value.length > 0
};

export const email = {
  message: 'Please, enter correct email',
  validator: value => emailPattern.test(value)
};

export const mailRules = {
  authUser: [required, email],
  email: [required, email],
  authPass: [required]
};

export default function (rules = mailRules) {
  return (values = {}) => {
    const errors = {};
    Object.keys(rules).forEach(fieldName => {
      rules[fieldName].forEach(rule => {
        if (!errors[fieldName] &&
          !rule.validator(values[fieldName])) {
          errors[fieldName] = rule.message;
        }
      });
    });
    return errors;
  };
}
