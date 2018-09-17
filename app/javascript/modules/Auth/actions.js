import Api from 'utils/api';

export const login = params => dispatch => dispatch({
  type: 'LOGIN',
  payload: Api().login(params),
});

export const register = params => dispatch => dispatch({
  type: 'REGISTER',
  payload: Api().register(params),
});
