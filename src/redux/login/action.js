import * as types from './types';

export const loginRequest = (username, password) => ({
  type: types.LOGIN_REQUEST,
  payload: {username, password},
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});