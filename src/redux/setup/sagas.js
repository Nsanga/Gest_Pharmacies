import { all } from 'redux-saga/effects';
import CampaignSaga from 'redux/campagne/saga';
import PlateformeSaga from 'redux/plateforme/saga';
import ServiceSaga from 'redux/service/saga';
import UserSaga from 'redux/user/saga';

/**
 * @description combine sagas
 */
export default function* Sagas() {
  yield all([
    PlateformeSaga(),
    ServiceSaga(),
    CampaignSaga(),
    UserSaga(),
  ]);
}
