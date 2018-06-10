import {
  all,
  takeEvery,
  takeLatest,
  put,
  fork,
  call
} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';
import { clearToken } from '../../helpers/utility';
import getToken from '../../helpers/getToken';
import authActions from './actions';
import agentActions from '../agent/actions';
import AuthenticationService from '../../services/AuthenticationService';

function* loginRequest ({ payload }) {
  try {
    const { data: { token } } = yield call(AuthenticationService, payload);
    const agent = jwtDecode(token);

    yield put({
      type: authActions.LOGIN_SUCCESS,
      token,
    });

    yield put({
      type: agentActions.SET_USER,
      agent,
    });
  } catch (e) {
    console.log("DEU ERRO!!!", e);
    yield put({ type: authActions.LOGIN_ERROR });
  }
}

// function* loginSuccess() {
//   yield takeEvery(authActions.LOGIN_SUCCESS, function* (payload) {
//     yield localStorage.setItem('token', payload.token);
//   });
// }

function* loginError() {
  yield takeEvery(authActions.LOGIN_ERROR, function*() {});
}

function* logout() {
  yield takeEvery(authActions.LOGOUT, function*() {
    clearToken();
    yield put(push('/'));
  });
}

// When refresh a page
function* checkAuthorization () {
  console.warn("When refresh a page this enter in context");
  // const token = yield getToken();
  //
  // if (!token) {
  //   console.log("VAI LOGAR");
  //   yield put(push('/'));
  // }
}
export default function* rootSaga() {
  yield all([
    takeLatest(authActions.CHECK_AUTHORIZATION, checkAuthorization),
    takeLatest(authActions.LOGIN_REQUEST, loginRequest),
    // fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
