// import api from './api';
import  axios  from "axios";

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token; // Sets the default header x-auth-token in the axios instance to the provided token. This ensures that all subsequent requests made using this axios instance will include the token in the headers.
    localStorage.setItem('token', token); //Stores the token in localStorage under the key 'token'. This allows the token to persist across browser sessions. 
    // console.log(localStorage.getItem('token'));

  } else {
    delete axios.defaults.headers.common['x-auth-token']; //Removes the x-auth-token header from the axios instance. This means subsequent requests will not include the token.
    localStorage.removeItem('token'); //Removes the token from localStorage. This effectively logs out the user by clearing their token.
  }
};

export default setAuthToken;
