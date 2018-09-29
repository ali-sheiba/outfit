import { errorMessage } from 'utils/errors';

const initalState = {
  fetching: false,
  error: false,
  message: null,
  item: {},
  items: [],
  count: 0,
  options: {},
  deletingId: null,
};

const reducer = (state = initalState, { type, payload, meta }) => {
  switch (type) {
    case 'FETCH_ITEMS_PENDING':
    case 'CREATE_ITEMS_PENDING':
    case 'FETCH_ITEMS_OPTIONS_PENDING':
      return {
        ...state,
        fetching: true,
        error: false,
      };
    case 'FETCH_ITEMS_FULFILLED':
      return {
        ...state,
        fetching: false,
        items: payload.data.items,
        count: payload.data.pagination.total_entries,
      };
    case 'FETCH_ITEMS_REJECTED':
    case 'DELETE_ITEM_REJECTED':
    case 'CREATE_ITEM_REJECTED':
    case 'FETCH_ITEMS_OPTIONS_REJECTED':
      return {
        ...state,
        fetching: false,
        error: errorMessage(payload),
      };
    case 'FETCH_ITEMS_OPTIONS_FULFILLED':
      return {
        ...state,
        fetching: false,
        options: {
          brands: payload.data.brands,
          colors: payload.data.colors,
          categories: payload.data.categories,
        },
      };
    case 'CREATE_ITEM_FULFILLED':
      return {
        ...state,
        fetching: false,
        items: [...state.items, payload.data.item],
        count: state.count + 1,
      };
    case 'DELETE_ITEM_PENDING':
      return {
        ...state,
        deletingId: meta.id,
      };
    case 'DELETE_ITEM_FULFILLED':
      return {
        ...state,
        items: state.items.filter(i => i.id !== payload.data.id),
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
