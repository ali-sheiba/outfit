import Api from 'utils/api';

export const fetchItems = params => dispatch => dispatch({
  type: 'FETCH_ITEMS',
  payload: Api().getItems(params),
});

export const fetchItem = (id, params) => dispatch => dispatch({
  type: 'FETCH_ITEM',
  payload: Api().getItem(id, params),
});

export const updateItem = (id, params) => dispatch => dispatch({
  type: 'UPDATE_ITEM',
  payload: Api().updateItem(id, params),
});

export const createItem = params => dispatch => dispatch({
  type: 'CREATE_ITEM',
  payload: Api().createItem(params),
});

export const deleteItem = (id, params) => dispatch => dispatch({
  type: 'DELETE_ITEM',
  payload: Api().deleteItem(id, params),
  meta: { id },
});

export const fetchOptions = params => dispatch => dispatch({
  type: 'FETCH_ITEMS_OPTIONS',
  payload: Api().getItemsOptions(params),
});

export const fetchItemsIfNeeded = params => (dispatch, getState) => {
  const { items, error } = getState().items;
  if (items.length === 0 || error) {
    return dispatch(fetchItems(params));
  }
  return null;
};
