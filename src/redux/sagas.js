import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import agentSagas from './agent/saga';
import contactSagas from './contacts/saga';
import invoicesSagas from './invoice/saga';
import mailSagas from './mail/saga';
import notesSagas from './notes/saga';
import todosSagas from './todos/saga';
import ecommerceSaga from './ecommerce/saga';
import cardsSagas from './card/saga';
import chatSagas from './chat/sagas';
import youtubeSearchSagas from './youtubeSearch/sagas';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    agentSagas(),
    contactSagas(),
    mailSagas(),
    notesSagas(),
    todosSagas(),
    ecommerceSaga(),
    cardsSagas(),
    invoicesSagas(),
    chatSagas(),
    youtubeSearchSagas(),
  ]);
}
