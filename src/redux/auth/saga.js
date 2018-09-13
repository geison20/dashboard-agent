import { push } from "react-router-redux";
import { all, takeEvery, takeLatest, put, fork } from "redux-saga/effects";

import { LOGIN_SUCCESS, LOGOUT, SET_ACCOUNT_TOKEN } from "./actions";
import { SET_USER } from "../agent/actions";
import { SET_ACCOUNT } from "../account/actions";

function* loginSuccess({ payload: { token, agent, account } }) {
	try {
		yield put({
			type: SET_ACCOUNT_TOKEN,
			token,
		});

		yield put({
			type: SET_USER,
			agent,
		});

		yield put({
			type: SET_ACCOUNT,
			account,
		});

		yield put(push("/dashboard"));
	} catch (e) {
		console.log(e);
	}
}

function* logout() {
	yield takeEvery(LOGOUT, function*() {
		yield put(push("/signin"));
	});
}

export default function* rootSaga() {
	yield all([takeLatest(LOGIN_SUCCESS, loginSuccess), fork(logout)]);
}
