import { combineReducers } from 'redux';
import CampaignReducer from 'redux/campagne/reducer';
import PlateformeReducer from 'redux/plateforme/reducer';
import ServiceReducer from 'redux/service/reducer';
import UserReducer from 'redux/user/reducer';

/**
 * @description combine reducers
 */
const rootReducer = combineReducers({
  PlateformeReducer,
  ServiceReducer,
  CampaignReducer,
  UserReducer,
});

export default rootReducer;
