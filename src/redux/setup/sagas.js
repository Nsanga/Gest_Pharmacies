import { all } from 'redux-saga/effects';
import PlateformeSaga from 'redux/plateforme/saga';
import PharmacieSaga from 'redux/pharmacie/saga';
import UserSaga from 'redux/user/saga';
import MedicamentSaga from 'redux/medicament/saga';

/**
 * @description combine sagas
 */
export default function* Sagas() {
  yield all([
    PlateformeSaga(),
    PharmacieSaga(),
    MedicamentSaga(),
    UserSaga(),
  ]);
}
