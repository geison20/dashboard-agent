import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import agentSagas from "./agent/saga";
import accountSagas from "./account/saga";
import chatSagas from "./chat/saga";

export default function* rootSaga(getState) {
	yield all([authSagas(), agentSagas(), accountSagas(), chatSagas()]);
}
