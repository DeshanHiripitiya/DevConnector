import { createStore, applyMiddleware } from 'redux'; //createStore: A function that creates a Redux store to hold the state of your app. The only way to change the state inside it is to dispatch an action.applyMiddleware: A function that applies middleware to the store. Middleware can intercept actions before they reach the reducer, often used for asynchronous actions or logging.
import { composeWithDevTools } from 'redux-devtools-extension'; //This function is used to enhance the store with DevTools capabilities. It allows you to use the Redux DevTools extension in your browser to inspect and debug your Redux store.
import { thunk } from 'redux-thunk'; //redux-thunk is a middleware that allows you to write action creators that return a function instead of an action. This function can be used to delay the dispatch of an action or to dispatch only if a certain condition is met, making it useful for handling asynchronous operations.
import rootReducer from './reducers'; //This is your root reducer, which is a combination of all your reducers. The root reducer should manage the state of your entire application.
// import setAuthToken from './utils/setAuthToken';

const initialState = {}; //This is the initial state of your Redux store. It's set to an empty object here, but you can define an initial state based on the requirements of your application.

const middleware = [thunk]; //This array contains all the middleware you want to apply to the store. In this case, it only contains thunk, which allows you to write action creators that return a function instead of an action

const store = createStore(
  //The createStore function creates the Redux store. It takes three arguments
  rootReducer, //The root reducer that combines all your individual reducers.
  initialState, //The initial state of your application.
  composeWithDevTools(applyMiddleware(...middleware)) //This applies the middleware to the store and also integrates with Redux DevTools for better debugging. applyMiddleware is used to apply the thunk middleware, and composeWithDevTools is used to enable the Redux DevTools extension.
);

/*
  NOTE: set up a store subscription listener
  to store the users token in localStorage
 */

/*
  initialize current state from redux store for subscription comparison
  preventing undefined error
 */
// let currentState = store.getState();

// store.subscribe(() => {
//   // keep track of the previous and current state to compare changes
//   let previousState = currentState;
//   currentState = store.getState();
//   // if the token changes set the value in localStorage and axios headers
//   if (previousState.auth.token !== currentState.auth.token) {
//     const token = currentState.auth.token;
//     setAuthToken(token);
//   }
// });

export default store;