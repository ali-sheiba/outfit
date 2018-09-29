import { errorMessage } from 'utils/errors';

const initalState = {
  fetching: false,
  fetched: false, // indicate if index already fitched or need refresh
  error: false,
  message: null,
  outfit: {},
  outfits: [],
  count: 0,
  options: {},
  deletingId: null,
};

const reducer = (state = initalState, { type, payload, meta }) => {
  switch (type) {
    case 'FETCH_OUTFITS_PENDING':
    case 'FETCH_OUTFIT_PENDING':
    case 'CREATE_OUTFIT_PENDING':
    case 'UPDATE_OUTFIT_PENDING':
    case 'FETCH_OUTFITS_OPTIONS_PENDING':
      return {
        ...state,
        fetching: true,
        error: false,
      };
    case 'FETCH_OUTFITS_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        outfits: payload.data.outfits,
        count: payload.data.pagination.total_entries,
      };
    case 'FETCH_OUTFITS_REJECTED':
    case 'FETCH_OUTFIT_REJECTED':
    case 'DELETE_OUTFIT_REJECTED':
    case 'CREATE_OUTFIT_REJECTED':
    case 'UPDATE_OUTFIT_REJECTED':
    case 'FETCH_OUTFITS_OPTIONS_REJECTED':
      return {
        ...state,
        fetching: false,
        error: errorMessage(payload),
      };
    case 'FETCH_OUTFITS_OPTIONS_FULFILLED':
      return {
        ...state,
        fetching: false,
        options: {
          brands: payload.data.brands,
          colors: payload.data.colors,
          categories: payload.data.categories,
        },
      };
    case 'DELETE_OUTFIT_PENDING':
      return {
        ...state,
        deletingId: meta.id,
      };
    case 'CREATE_OUTFIT_FULFILLED':
      return {
        ...state,
        fetching: false,
        outfits: state.outfits.concat(payload.data.outfit),
        count: state.count + 1,
      };
    case 'FETCH_OUTFIT_FULFILLED':
      return {
        ...state,
        fetching: false,
        outfit: payload.data.outfit,
      };
    case 'UPDATE_OUTFIT_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: false, // force index to be relaoded
        outfit: payload.data.outfit,
      };
    case 'DELETE_OUTFIT_FULFILLED':
      return {
        ...state,
        outfits: state.outfits.filter(i => i.id !== payload.data.id),
        count: state.count - 1,
        deletingId: null,
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
