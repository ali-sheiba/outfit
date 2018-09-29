import { errorMessage } from 'utils/errors';

const initalState = {
  fetching: false,
  error: false,
  outfits: [],
  items: [],
  selectedItem: null,
};

const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case 'FETCH_RECOMMENDATIONS_PENDING':
      return {
        ...state,
        fetching: true,
        error: false,
        outfits: [],
        items: [],
      };
    case 'FETCH_RECOMMENDATIONS_FULFILLED':
      return {
        ...state,
        fetching: false,
        outfits: payload.data.outfits,
        items: payload.data.items,
      };
    case 'FETCH_RECOMMENDATIONS_REJECTED':
      return {
        ...state,
        fetching: false,
        error: errorMessage(payload),
      };
    case 'SELECT_RECOMMENDATIONS_ITEM':
      return {
        ...state,
        selectedItem: payload.id,
      };
    case 'UNSELECT_RECOMMENDATIONS_ITEM':
      return {
        ...state,
        selectedItem: null,
      };
    case 'LOGIN_FULFILLED':
    case 'REGISTER_FULFILLED':
    case 'LOGOUT_FULFILLED':
      return initalState;
    default:
      return state;
  }
};

export default reducer;
