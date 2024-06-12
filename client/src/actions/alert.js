import { v4 as uuidv4 } from 'uuid'; //v4 from the uuid library. It is used to generate a unique identifier for each alert.
import { SET_ALERT, REMOVE_ALERT } from './types'; //These are the action types used for setting and removing alerts, respectively.

export const setAlert = //setAlert is an action creator function that takes three parameters: msg, alertType, and timeout.

    (msg, alertType, timeout = 5000) => //msg: The message content of the alert.alertType: The type of the alert (e.g., 'success', 'error', 'warning').timeout: Optional parameter (default is 5000 milliseconds), specifies how long the alert will be displayed before it automatically disappears.

    (dispatch) => {
      const id = uuidv4(); //Generates a unique id using uuidv4().
      dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id },
      });

      setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    };
