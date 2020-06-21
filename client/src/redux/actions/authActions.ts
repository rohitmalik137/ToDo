import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';
import { IAuthFunction, IConfigHeaders } from '../types/interfaces';

//check token and load user
export const loadUser = () => (dispatch: Function, getState: Function) => {
  // user loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/auth/user', tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
export const register = ({ email, password }: IAuthFunction) => (
  dispatch: Function
) => {
  //headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  //Request Body
  const body = JSON.stringify({ email, password });
  axios
    .put('/auth/signup', body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login User
export const login = ({ email, password }: IAuthFunction) => (
  dispatch: Function
) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/auth/login', body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

//setup config/headers and token
export const tokenConfig = (getState: Function) => {
  // get token from storage
  const token = getState().auth.token;

  // headers
  const config: IConfigHeaders = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  //if token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
