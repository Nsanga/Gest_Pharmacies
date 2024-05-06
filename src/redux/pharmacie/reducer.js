import * as types from './types';

const INITIAL_STATE = {
  pharmacies: [],
  loading: false,
  error: null,
};

function PharmacieReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_PHARMACIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_PHARMACIES_SUCCESS:
      return {
        ...state,
        loading: false,
        pharmacies: action.payload.data.pharmacies,
      };
    case types.GET_PHARMACIES_FAILED:
      return {
        ...state,
        loading: false,
        pharmacies: [],
      };
    case types.UPDATE_PHARMACIE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_PHARMACIE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_PHARMACIE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_PHARMACIE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_PHARMACIE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.ADD_PHARMACIE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.DELETE_PHARMACIE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_PHARMACIE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.DELETE_PHARMACIE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export default PharmacieReducer;