import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import rootSaga from "./sagas";
import persistConfig from "../settings/persistConfiguration";
import authActions from "./auth/actions";

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		...reducers,
		router: routerReducer,
	}),
);

const store = createStore(
	persistedReducer,
	compose(applyMiddleware(thunk, sagaMiddleware, routeMiddleware)),
);

const persistor = persistStore(store, {}, () => {
	store.dispatch(authActions.checkAuthorization());
});

sagaMiddleware.run(rootSaga);

export { store, history, persistor };
