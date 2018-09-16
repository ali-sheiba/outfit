/* eslint no-restricted-globals: 0 */

export const required = value => (typeof value !== 'undefined' && value !== null && value !== ''
  ? undefined
  : 'field is required');

export const maxLength = max => value => (value && value.length > max
  ? `max length is ${max}`
  : undefined);

export const minLength = min => value => (value && value.length < min
  ? `min length is ${min}`
  : undefined);

export const number = value => (value && isNaN(Number(value))
  ? 'field should be number'
  : undefined);

export const username = value => (value && !/^[A-Z0-9._%+-]+$/i.test(value)
  ? 'inavlid username'
  : undefined);

export const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'invalid email'
  : undefined);
