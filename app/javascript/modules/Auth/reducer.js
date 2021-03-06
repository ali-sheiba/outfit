const initalState = {
  fetching: false,
  error: false,
  message: null,
  isLogin: false,
  profile: {},
};

const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case 'LOGIN_PENDING':
    case 'REGISTER_PENDING':
    case 'FETCH_PROFILE_PENDING':
    case 'UPDATE_PROFILE_PENDING':
    case 'LOGOUT_PENDING':
      return {
        ...state,
        fetching: true,
        error: false,
        message: null,
      };
    case 'LOGIN_FULFILLED':
    case 'REGISTER_FULFILLED':
    case 'FETCH_PROFILE_FULFILLED':
      return {
        ...state,
        fetching: false,
        message: payload.data.message,
        profile: payload.data.user,
        isLogin: true,
      };
    case 'LOGIN_REJECTED':
    case 'REGISTER_REJECTED':
    case 'LOGOUT_REJECTED':
      return {
        ...state,
        fetching: false,
        error: true,
        message: payload.response ? payload.response.data.error : payload.message,
        isLogin: false,
      };
    case 'LOGOUT_FULFILLED':
      return {
        fetching: false,
        message: payload.data.message,
        profile: {},
        isLogin: false,
      };
    default:
      return state;
  }
};

export default reducer;
