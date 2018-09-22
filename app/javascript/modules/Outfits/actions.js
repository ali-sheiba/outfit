import Api from 'utils/api';

export const fetchOutfits = params => dispatch => dispatch({
  type: 'FETCH_OUTFITS',
  payload: Api().getOutfits(params),
});

export const fetchOutfit = (id, params) => dispatch => dispatch({
  type: 'FETCH_OUTFIT',
  payload: Api().getOutfit(id, params),
});

export const updateOutfit = (id, params) => dispatch => dispatch({
  type: 'UPDATE_OUTFIT',
  payload: Api().updateOutfit(id, params),
});

export const createOutfit = params => dispatch => dispatch({
  type: 'CREATE_OUTFIT',
  payload: Api().createOutfit(params),
});

export const deleteOutfit = (id, params) => dispatch => dispatch({
  type: 'DELETE_OUTFIT',
  payload: Api().deleteOutfit(id, params),
  meta: { id },
});

export const fetchOptions = params => dispatch => dispatch({
  type: 'FETCH_OUTFITS_OPTIONS',
  payload: Api().getOutfitsOptions(params),
});

export const fetchOutfitsIfNeeded = params => (dispatch, getState) => {
  const { fetched } = getState().outfits;
  if (!fetched) {
    return dispatch(fetchOutfits(params));
  }
  return null;
};
