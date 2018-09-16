import Api from 'utils/api';

export const login = params => dispatch => dispatch({
  type: 'LOGIN',
  payload: Api().login(params),
});
