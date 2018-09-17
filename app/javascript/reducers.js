import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from 'modules/Auth/reducer';

export default combineReducers({
  auth,
  form: formReducer,
});
