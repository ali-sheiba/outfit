import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// import auth from './modules/Login/reducer';

export default combineReducers({
  form: formReducer,
});
