import Api from 'utils/api';

export const fetchRecommendations = params => dispatch => dispatch({
  type: 'FETCH_RECOMMENDATIONS',
  payload: Api().getRecommendations(params),
});

export const selectItem = itemId => dispatch => dispatch({
  type: 'SELECT_RECOMMENDATIONS_ITEM',
  payload: { id: itemId },
});

export const unSelectItem = () => dispatch => dispatch({
  type: 'UNSELECT_RECOMMENDATIONS_ITEM',
  payload: {},
});
