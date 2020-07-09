import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from './types';
import setToken from '../utils/setToken';

// to Load an User
export const load = () => async (dispatch) => {
  //   check if there is a token in the local storage
  if (localStorage.token) {
    //   set it as a header
    setToken(localStorage.token);
  }
  try {
    //   to get user by its token
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// To Regiter an user
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};