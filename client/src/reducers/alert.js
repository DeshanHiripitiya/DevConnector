import { SET_ALERT, REMOVE_ALERT } from '../actions/types'; //These are action types defined as constants to ensure consistency between action creators and reducers.

const initialState = []; //This initializes state to an empty array, which will hold the list of alerts.

function alertReducer(state = initialState, action) {
  //alertReducer is a function that takes two parameters: state (which defaults to initialState) and action. The action parameter represents the action dispatched from the action creator.
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload]; //It uses the spread operator (...) to create a new array ([...state]) with the existing alerts and adds the new alert (payload) to the end.
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload); //It uses the filter method to create a new array that excludes the alert with the specified payload.id.This ensures that the alert with the matching id is removed from the state.
    default:
      return state; //If the action type does not match any of the defined cases, the reducer returns the current state unchanged.
  }
}

export default alertReducer;
