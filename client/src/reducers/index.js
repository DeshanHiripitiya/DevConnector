import { combineReducers } from 'redux'; // This function is used to combine multiple reducers into one main (or root) reducer. Each individual reducer manages its own slice of the application state.
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
});
 