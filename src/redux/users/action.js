import * as types from './types';

export const list = payload => ({
  type: types.GET_USERS_REQUEST,
  payload
});

export const update = (id, userData) => ({
    type: types.UPDATE_USER_REQUEST,
    payload: {id, userData}
  });

  export const Add = (userData) => ({
    type: types.ADD_USER_REQUEST,
    payload: userData
  });

  export const deleteUser = (id) => ({
    type: types.DELETE_USER_REQUEST,
    payload: {id}
  });