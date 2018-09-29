/* eslint-disable no-param-reassign */

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
        error: false,
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
        error: false,
      };
    case 'LIKE_OUTFIT_FULFILLED':
      return {
        ...state,
        likingId: null,
        outfits: state.outfits.map((o) => {
          if (o.id === payload.data.outfit.id) {
            o.liked = payload.data.outfit.liked;
            o.likes = payload.data.outfit.likes;
          }
          return o;
        }),
      };
    case 'LIKE_OUTFIT_REJECTED':
      return {
        ...state,
        likingId: null,
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
