/* eslint camelcase: 0 */

import { SubmissionError } from 'redux-form';
import { NotificationManager } from 'react-notifications';

const formErrorCodes = [1010, 1301, 1307];

export const errorMessage = err => (err.response ? err.response.data.error : err.message);

export const errCatcher = (err, submissionError = true) => {
  if (err.response) {
    const {
      error_code, data, error, message,
    } = err.response.data;
    if (error_code && formErrorCodes.includes(error_code) && submissionError) {
      throw new SubmissionError({
        ...data,
        _error: error,
      });
    } else if ((error_code >= 1200 && error_code <= 1299) || error_code === 1001) {
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    NotificationManager.error(message || error);
  } else {
    NotificationManager.error(err.message);
  }
  return err;
};
