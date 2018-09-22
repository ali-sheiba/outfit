import Api from 'utils/api';

export const exploreOutfits = params => dispatch => dispatch({
  type: 'EXPLORE_OUTFITS',
  payload: Api().exploreOutfits(params),
});

export const exploreOutfit = (id, params) => dispatch => dispatch({
  type: 'EXPLORE_OUTFIT',
  payload: Api().exploreOutfit(id, params),
});

export const likeOutfit = (id, params) => dispatch => dispatch({
  type: 'LIKE_OUTFIT',
  payload: Api().likeOutfit(id, params),
  meta: { id },
});
