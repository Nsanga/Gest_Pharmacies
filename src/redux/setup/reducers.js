import { combineReducers } from 'redux';
import PlateformeReducer from 'redux/plateforme/reducer';
import PharmacieReducer from 'redux/pharmacie/reducer';
import UserReducer from 'redux/user/reducer';
import MedicamentReducer from 'redux/medicament/reducer';

/**
 * @description combine reducers
 */
const rootReducer = combineReducers({
  PlateformeReducer,
  PharmacieReducer,
  MedicamentReducer,
  UserReducer,
});

export default rootReducer;
