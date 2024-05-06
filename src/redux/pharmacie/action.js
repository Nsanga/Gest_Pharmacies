import * as types from './types';

export const listPharmacie = payload => ({
  type: types.GET_PHARMACIES_REQUEST,
  payload
});

export const updatePharmacie = (id, pharmacieData) => ({
    type: types.UPDATE_PHARMACIE_REQUEST,
    payload: {id, pharmacieData}
  });

  export const AddPharmacie = (pharmacieData) => ({
    type: types.ADD_PHARMACIE_REQUEST,
    payload: pharmacieData
  });

  export const deletePharmacie = (id) => ({
    type: types.DELETE_PHARMACIE_REQUEST,
    payload: {id}
  });