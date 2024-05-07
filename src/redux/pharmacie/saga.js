import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import toast from 'react-hot-toast';
import { getUnauthRequest } from 'helper/api';
import { url } from 'urlLoader';
import { putUnauthRequest } from 'helper/api';
import { postUnauthRequest } from 'helper/api';
import { deleteUnauthRequest } from 'helper/api';

function* listPharmacie() {
    try {
        let link = `${url}/api/v1/pharmacie/list`;
        const data = yield getUnauthRequest(link);
        if (data.message === "Success") {
            yield put({ type: types.GET_PHARMACIES_SUCCESS, payload: data });
        } else {
            yield put({ type: types.GET_PHARMACIES_FAILED, payload: "echec recuperation des données" });
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_PHARMACIES_FAILED, payload: error });
    }
}

function* update(action) {
    const { id } = action.payload;
    try {
        let link = `${url}/api/v1/pharmacie/update?id=${id}`;
        const data = yield putUnauthRequest(link, action.payload.pharmacieData);
        console.log("data:::/", data)
        if (data.message === "Success") {
            yield put({ type: types.UPDATE_PHARMACIE_SUCCESS, payload: data.data.pharmacie });
            toast.success(data.data.message);
            yield put({ type: types.GET_PHARMACIES_REQUEST });
        } else {
            yield put({ type: types.UPDATE_PHARMACIE_FAILED, payload: "Échec lors de la modification des données" });
            toast.error(data.data.message);
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.UPDATE_PHARMACIE_FAILED, payload: error });
    }
}

function* add(action) {
    try {
        const link = `${url}/api/v1/pharmacie/add`;
        const data = yield postUnauthRequest(link, JSON.stringify(action.payload));
        console.log('dataADD::', data)

        if (data) {
            yield put({ type: types.ADD_PHARMACIE_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_PHARMACIES_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été ajouté.");
            yield put({ type: types.ADD_PHARMACIE_FAILED, payload: "Échec lors de la récupération des données" });
        }

    } catch (error) {
        toast.error("Aucune donnée n'a été ajouté.");
        console.error(error);
        yield put({ type: types.ADD_PHARMACIE_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

function* deletePharmacie (action) {
    const { id } = action.payload;
console.log('id', id)
    try {
        const link = `${url}/api/v1/pharmacie/delete?id=${id}`;

        const data = yield deleteUnauthRequest(link);
        if (data) {
            yield put({ type: types.DELETE_PHARMACIE_SUCCESS, payload: data });
            toast.success(data.data.message);
            yield put({ type: types.GET_PHARMACIES_REQUEST });
        } else {
            toast.error("Aucune donnée n'a été supprimé.");
            yield put({ type: types.DELETE_PHARMACIE_FAILED, payload: "Échec lors de la suppression des données" });
        }

    } catch (error) {
        console.error(error);
        toast.error("Aucune donnée n'a été supprimé.");
        yield put({ type: types.DELETE_PHARMACIE_FAILED, payload: error.message || "Une erreur s'est produite" });
    }
}

export default function* PharmacieSaga() {
    yield takeLatest(types.GET_PHARMACIES_REQUEST, listPharmacie);
    yield takeLatest(types.UPDATE_PHARMACIE_REQUEST, update);
    yield takeLatest(types.ADD_PHARMACIE_REQUEST, add);
    yield takeLatest(types.DELETE_PHARMACIE_REQUEST, deletePharmacie);
}