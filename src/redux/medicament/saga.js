import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getUnauthRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putUnauthRequest } from 'helper/api';
import { postUnauthRequest } from 'helper/api';
import { deleteUnauthRequest } from 'helper/api';

function* list() {
    try {
        let link = `${url}/api/v1/medicament/list`;
        const data = yield getUnauthRequest(link);
        if (data.message === "Success") {
            yield put({ type: types.GET_MEDICAMENTS_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_MEDICAMENTS_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_MEDICAMENTS_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/medicament/update?id=${id}`;
        const data = yield putUnauthRequest(link, action.payload.medicamentData);
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_MEDICAMENT_SUCCESS, payload: data.data.product });
            toast.success(data.data.message);
            yield put({ type: types.GET_MEDICAMENTS_REQUEST });
        } else {
            yield put({ type: types.UPDATE_MEDICAMENT_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_MEDICAMENT_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const link = `${url}/api/v1/medicament/add`;
        const data = yield postUnauthRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data) {
            yield put({ type: types.ADD_MEDICAMENT_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_MEDICAMENTS_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_MEDICAMENT_FAILED, payload: "Échec lors de la récupération des données" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_MEDICAMENT_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deleteMedicament (action) {
    const { id } = action.payload;
console.log('id', id)
    try {
        const link = `${url}/api/v1/medicament/delete?id=${id}`;

        const data = yield deleteUnauthRequest(link);
        if (data) {
            yield put({ type: types.DELETE_MEDICAMENT_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_MEDICAMENTS_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_MEDICAMENT_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_MEDICAMENT_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* MedicamentSaga() {
    yield takeLatest(types.GET_MEDICAMENTS_REQUEST, list);
    yield takeLatest(types.UPDATE_MEDICAMENT_REQUEST, update);
    yield takeLatest(types.ADD_MEDICAMENT_REQUEST, add);
    yield takeLatest(types.DELETE_MEDICAMENT_REQUEST, deleteMedicament);
}