import React, { Fragment,useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; //Purpose: The Link component is used to create navigational links in your application. It's similar to the HTML <a> tag but provides enhanced functionality suited for single-page applications (SPAs).
//Purpose: The Navigate component is used to programmatically navigate to a different route. This can be useful for redirecting users under certain conditions, such as after form submission or authentication.

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

   const { name, email, password, password2 } = formData;
 
     const onChange = (e) =>
       setFormData({ ...formData, [e.target.name]: e.target.value }); //e.target.name refers to the name attribute of the input field that triggered the change event.e.target.value refers to the current value of that input field.
     
      const onSubmit = async (e) => {
        e.preventDefault(); //When a form is submitted, the default action is to send a request to the server and reload the page. Using e.preventDefault(); in a form submission handler prevents this default behavior, allowing you to handle the form submission with JavaScript instead
        if (password !== password2) {
          // setAlert('Passwords do not match', 'danger');
          console.log('password not match');
        } else {
          // register({ name, email, password });
          console.log(formData);
        }
      };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='form' 
      onSubmit={onSubmit}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
