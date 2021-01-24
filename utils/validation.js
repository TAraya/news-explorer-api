import validator from 'validator';

function isEmail(value) {
  return validator.isEmail(value);
}

function isUrl(value) {
  return validator.isURL(value);
}

function notWhitespacesValidator(value, helper) {
  if (value.trim().length > 0) {
    return value;
  }

  return helper.error('any.invalid');
}

export { isEmail, isUrl, notWhitespacesValidator };
