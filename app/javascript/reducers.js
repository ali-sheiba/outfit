import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from 'modules/Auth/reducer';
import items from 'modules/Items/reducer';
import outfits from 'modules/Outfits/reducer';
import explores from 'modules/Explores/reducer';

export default combineReducers({
  auth,
  items,
  outfits,
  explores,
  form: formReducer,
});
