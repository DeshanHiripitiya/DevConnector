// import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';

// Redux
import { Provider } from 'react-redux';
import store from './store';
// import { loadUser } from './actions/auth';
// import setAuthToken from './utils/setAuthToken';

const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar />
      {/* <Alert /> */}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* <Route path='profiles' element={<Profiles />} /> */}
        {/* <Route path='profile/:id' element={<Profile />} /> */}
        {/* <Route
        path='dashboard'
        element={<PrivateRoute component={Dashboard} />}
      /> */}
        {/* <Route
        path='create-profile'
        element={<PrivateRoute component={ProfileForm} />}
      /> */}
        {/* <Route
        path='edit-profile'
        element={<PrivateRoute component={ProfileForm} />}
      /> */}
        {/* <Route
        path='add-experience'
        element={<PrivateRoute component={AddExperience} />}
      /> */}
        {/* <Route
        path='add-education'
        element={<PrivateRoute component={AddEducation} />}
      /> */}
        {/* <Route path='posts' element={<PrivateRoute component={Posts} />} /> */}
        {/* <Route path='posts/:id' element={<PrivateRoute component={Post} />} /> */}
        {/* <Route path='/*' element={<NotFound />} /> */}
      </Routes>
    </Router>
  </Provider>
);

export default App;
