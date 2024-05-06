import * as types from './types';

export const listMedicaments = payload => ({
  type: types.GET_MEDICAMENTS_REQUEST,
  payload
});

export const updateMedicament = (id, medicamentData) => ({
    type: types.UPDATE_MEDICAMENT_REQUEST,
    payload: {id, medicamentData}
  });

  export const AddMedicament = (medicamentData) => ({
    type: types.ADD_MEDICAMENT_REQUEST,
    payload: medicamentData
  });

  export const deleteMedicament = (id) => ({
    type: types.DELETE_MEDICAMENT_REQUEST,
    payload: {id}
  });