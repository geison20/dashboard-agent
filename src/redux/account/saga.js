import { all, takeLatest, put, call } from "redux-saga/effects";
import { CREATE_ACCOUNT } from "./actions";
import { create } from "../../services/AccountService";

function* createAccount({ payload }) {
	try {
		yield call(create, payload);
	} catch (e) {
		console.log("ERROO ======>", e.response);
	}
}

export default function* rootSaga() {
	yield all([takeLatest(CREATE_ACCOUNT, createAccount)]);
}
