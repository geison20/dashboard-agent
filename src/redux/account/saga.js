import { all, takeLatest, put, call } from "redux-saga/effects";
import { push } from "react-router-redux";
import accountActions from "./actions";
import AccountService from "../../services/AccountService";

function* createAccount({ payload }) {
	try {
		yield call(AccountService, payload);

		yield put({
			type: accountActions.ACCOUNT_SUCESS_CREATE,
		});
	} catch (e) {
		console.log("ERROO ======>", e.response);
		yield put({
			type: accountActions.API_ACCOUNT_CREATE_ERROR,
			errors: e.response.data,
		});
	}
}

export default function* rootSaga() {
	yield all([takeLatest(accountActions.CREATE_ACCOUNT, createAccount)]);
}
