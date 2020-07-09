import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useFormState from '../../hooks/useFormState';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = (props) => {
  const { setAlert, register, isAuthenticated } = props;
  const [formData, handleChange, resetForm] = useFormState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      // setAlert(msg,alertType)
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
    resetForm();
  };

  //   redirect if user is already authenticated
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={handleChange}
            required
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
            onChange={handleChange}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={handleChange}
            minLength='6'
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

// to pass state.isAuthenticated as prop to this component
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// The connect() function connects a React component to a Redux store.

// It provides its connected component with the pieces of the data it needs from the store,
// and the functions it can use to dispatch actions to the store.

// function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)

// The mapStateToProps and mapDispatchToProps deals with your Redux store’s state and dispatch, respectively.
// we get setAlert as a prop
export default connect(mapStateToProps, { setAlert, register })(Register);
