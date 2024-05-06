import * as types from './types';

const INITIAL_STATE = {
  medicaments: [],
  loading: false,
  error: null,
};

function MedicamentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_MEDICAMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_MEDICAMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        medicaments: action.payload.data.medicaments,
      };
    case types.GET_MEDICAMENTS_FAILED:
      return {
        ...state,
        loading: false,
        medicaments: [],
      };
    case types.UPDATE_MEDICAMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_MEDICAMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_MEDICAMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_MEDICAMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_MEDICAMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_MEDICAMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_MEDICAMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_MEDICAMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_MEDICAMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default MedicamentReducer;