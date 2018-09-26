/* eslint no-restricted-globals: 0 */

export const required = value => (typeof value !== 'undefined' && value !== null && value !== ''
  ? undefined
  : 'Field is required');

export const maxLength = (max, msg) => value => (value && value.length > max
  ? (msg || `Max length is ${max}`)
  : undefined);

export const minLength = (min, msg) => value => (value && value.length < min
  ? (msg || `Min length is ${min}`)
  : undefined);

export const number = value => (value && isNaN(Number(value))
  ? 'Field should be number'
  : undefined);

export const username = value => (value && !/^[A-Z0-9._%+-]+$/i.test(value)
  ? 'Invalid username'
  : undefined);

export const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email'
  : undefined);

export const mobile = value => (value && !/^(05){1}(\d){8}$/i.test(value)
  ? 'Invalid UAE Mobile number'
  : undefined);
