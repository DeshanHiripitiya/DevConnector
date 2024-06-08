import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'; //Purpose: The Link component is used to create navigational links in your application. It's similar to the HTML <a> tag but provides enhanced functionality suited for single-page applications (SPAs).
//Purpose: The Navigate component is used to programmatically navigate to a different route. This can be useful for redirecting users under certain conditions, such as after form submission or authentication.

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //e.target.name refers to the name attribute of the input field that triggered the change event.e.target.value refers to the current value of that input field.


  const onSubmit = async (e) => {
    e.preventDefault(); //When a form is submitted, the default action is to send a request to the server and reload the page. Using e.preventDefault(); in a form submission handler prevents this default behavior, allowing you to handle the form submission with JavaScript instead
      // register({ name, email, password });
      console.log('success');
    }


  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='register'>Sign Up</Link>
      </p>
    </Fragment>
  );
  };

export default Login;
