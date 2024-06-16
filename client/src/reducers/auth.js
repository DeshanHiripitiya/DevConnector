import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
  //initialState is an object that defines the default state for the authentication reducer
  token: localStorage.getItem('token'), //token: Retrieves the token from localStorage if it exists.
  isAuthenticated: null, /// indicating that the authentication status is unknown.
  loading: true,
  user: null,
};

function authReducer(state = initialState, action) { //state: Represents the current state of the reducer, which defaults to initialState.action: An object containing type and payload.
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token); //The token from payload is stored in localStorage.The token is saved to localStorage, ensuring the user stays logged in even after a page reload.
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        // user: payload,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token'); //The token is removed from localStorage.ensuring that no invalid token is stored.
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        // user: payload,
      };
    case LOGOUT:
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;
