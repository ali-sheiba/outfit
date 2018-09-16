import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from 'modules/Auth/Login/reducer';

export default combineReducers({
  auth,
  form: formReducer,
});
