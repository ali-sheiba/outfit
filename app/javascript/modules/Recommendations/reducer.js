import { errorMessage } from 'utils/errors';

const initalState = {
  fetching: false,
  error: false,
  recommendations: [],
  selectedItem: null,
};

const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case 'FETCH_RECOMMENDATIONS_PENDING':
      return {
        ...state,
        fetching: true,
        error: false,
        recommendations: [],
      };
    case 'FETCH_RECOMMENDATIONS_FULFILLED':
      return {
        ...state,
        fetching: false,
        recommendations: payload.data.outfits,
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
    default:
      return state;
  }
};

export default reducer;
