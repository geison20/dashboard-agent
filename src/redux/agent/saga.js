import {
  all,
  takeLatest,
} from 'redux-saga/effects';
import actions from './actions';
import AuthenticationService from '../../services/AuthenticationService';

// When refresh a page
function* checkAuthorization() {
  console.warn("When refresh a page this enter in context");
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.SET_USER, checkAuthorization),
  ]);
}
