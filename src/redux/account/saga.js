import { all, takeLatest, put, call } from "redux-saga/effects";
import { push } from "react-router-redux";
import accountActions from "./actions";
import AccountService from "../../services/AccountService";

function* createAccount({ payload }) {
	try {
		const a = yield call(AccountService, payload);
		console.log(a);
		// yield put({
		// 	type: authActions.LOGIN_SUCCESS,
		// 	token,
		// });
		// yield put(push("/signin"));
	} catch (e) {
		// yield put({ type: authActions.LOGIN_ERROR });
	}
}

export default function* rootSaga() {
	yield all([takeLatest(accountActions.CREATE_ACCOUNT, createAccount)]);
}
