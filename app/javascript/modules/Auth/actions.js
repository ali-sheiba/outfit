import Api from 'utils/api';

export const login = params => dispatch => dispatch({
  type: 'LOGIN',
  payload: Api().login(params),
});

export const register = params => dispatch => dispatch({
  type: 'REGISTER',
  payload: Api().register(params),
});

export const logout = params => dispatch => dispatch({
  type: 'LOGOUT',
  payload: Api().logout(params),
});

export const getProfile = params => dispatch => dispatch({
  type: 'FETCH_PROFILE',
  payload: Api().getProfile(params),
});

export const updateProfile = params => dispatch => dispatch({
  type: 'UPDATE_PROFILE',
  payload: Api().updateProfile(params),
});
