/* eslint-disable no-useless-escape */
export function isString(target) {
  return target && typeof target === 'string';
}

export function isNumber(target) {
  return isNotEmpty(target, true) && !isNaN(target);
}

export function isObject(target) {
  return target && typeof target === 'object';
}

export function isDate(target) {
  return target && Object.prototype.toString.call(target) === '[object Date]';
}

export function isArray(target) {
  return target && Object.prototype.toString.call(target) === '[object Array]';
}

export function isFunction(target) {
  return target && typeof target === 'function';
}

export function isNull(target) {
  return target === undefined || target === null;
}

export function isNotNull(target) {
  return !isNull(target);
}

export function isEmpty(target, noWhiteSpace = false, noZero = false) {
  return (
    isNull(target) ||
    target === '' ||
    (noWhiteSpace ? isString(target) && target.trim().length === 0 : false) ||
    (noZero ? target === 0 : false)
  );
}

export function isPostalCode(value) {
  const _POSTAL_CODE_REGEX = /^([a-zA-Z0-9 ]{4,7})$/i;

  return _POSTAL_CODE_REGEX.test(value);
}

export function isNotEmpty(target, noWhiteSpace = false, noZero = false) {
  return !isEmpty(target, noWhiteSpace, noZero);
}

export function isValidEmail(email) {
  const _EMAIL_REGEX =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return _EMAIL_REGEX.test(email);
}

export function isValidPassword(password) {
  return !!password && password.length >= 8;
}

export function isLowerCase(target) {
  return /^(.*[a-z].*)/g.test(target);
}

export function isUpperCase(target) {
  return /^(.*[A-Z].*)/g.test(target);
}

export function isIncludeNumber(target) {
  return /^(.*[0-9].*)/i.test(target);
}

export function isIncludeSpecialChars(target) {
  return /^(?=.*[@!#\$%&()>\\\*\~\|\}\{\_\^\?\+\-\=\[\],[\]\/])/i.test(target);
}

export function isValidOtp(otp) {
  return isNumber(otp) && otp.length >= 4;
}

export function isValidPhoneNumber(number) {
  return number && isNumber(number) && parseInt(number.split('')[0], 10) !== 0;
}
