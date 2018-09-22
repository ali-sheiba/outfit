import { errorMessage } from 'utils/errors';

const initalState = {
  fetching: false,
  error: false,
  message: null,
  outfit: {},
  outfits: [],
  pagination: {},
  options: {},
  likingId: null,
};

const reducer = (state = initalState, { type, payload, meta }) => {
  switch (type) {
    case 'EXPLORE_OUTFITS_PENDING':
    case 'EXPLORE_OUTFIT_PENDING':
      return {
        ...state,
        fetching: true,
      };
    case 'EXPLORE_OUTFITS_FULFILLED':
      return {
        ...state,
        fetching: false,
        outfits: payload.data.outfits,
        pagination: payload.data.pagination,
      };
    case 'EXPLORE_OUTFIT_FULFILLED':
      return {
        ...state,
        fetching: false,
        outfit: payload.data.outfit,
      };
    case 'EXPLORE_OUTFITS_REJECTED':
    case 'EXPLORE_OUTFIT_REJECTED':
      return {
        ...state,
        fetching: false,
        error: errorMessage(payload),
      };
    case 'LIKE_OUTFIT_PENDING':
      return {
        ...state,
        likingId: meta.id,
      };
    case 'LIKE_OUTFIT_FULFILLED':
      return {
        ...state,
        likingId: null,
        outfits: state.outfits.map((o) => {
          let newO = Object.assign({}, o);
          if (newO.id === payload.data.outfit.id) {
            newO = Object.assign({}, payload.data.outfit);
          }
          return newO;
        }),
      };
    case 'LIKE_OUTFIT_REJECTED':
      return {
        ...state,
        likingId: null,
      };
    default:
      return state;
  }
};

export default reducer;
