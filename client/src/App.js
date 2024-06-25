import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Alert from './component/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utills/setAuthToken';
import Dashboard from './component/dashboard/Dashboard';
import ProfileForm from './component/profile-forms/CreateProfile';
import AddExperience from './component/profile-forms/AddExperience';
import AddEducation from './component/profile-forms/AddEducation';
import Profiles from './component/profiles/profiles';
import PrivateRoute from './component/routeing/PrivateRoute';
import Profile from './component/profile/Profile';
import Posts from './component/posts/Posts';
// import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';






// import { loadUser } from './actions/auth';
// import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => {

  useEffect(() => {
    // check for token in LS when app first runs
    // if (localStorage.token) {
    //   // if there is a token set axios headers for all requests
    //   setAuthToken(localStorage.token);
    // }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    // window.addEventListener('storage', () => {
    //   if (!localStorage.token) store.dispatch({ type: LOGOUT });
    // });
  }, []);


  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='profiles' element={<Profiles />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route
            path='dashboard'
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
        path='create-profile'
        element={<PrivateRoute component={ProfileForm} />}
      />
          <Route
        path='edit-profile'
        element={<PrivateRoute component={ProfileForm} />}
      />
          <Route
        path='add-experience'
        element={<PrivateRoute component={AddExperience} />}
      />
          <Route
        path='add-education'
        element={<PrivateRoute component={AddEducation} />}
      />
          <Route path='posts' element={<PrivateRoute component={Posts} />} />
          {/* <Route path='posts/:id' element={<PrivateRoute component={Post} />} /> */}
          {/* <Route path='/*' element={<NotFound />} /> */}
        </Routes>
      </Router>
    </Provider>
  );};

export default App;
