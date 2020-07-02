import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useFormState from '../../hooks/useFormState';

const Login = () => {
  const [formData, handleChange, resetForm] = useFormState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Success');
    resetForm();
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleChange}
            minLength='6'
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
