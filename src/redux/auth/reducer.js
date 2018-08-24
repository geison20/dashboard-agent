import { LOGIN_ERROR, LOGOUT, SET_ACCOUNT_TOKEN } from "./actions";

const initState = {
	token: null,
};

export default function authReducer(state = initState, { type, token }) {
	switch (type) {
		case LOGIN_ERROR:
			return {
				...state,
			};

		case SET_ACCOUNT_TOKEN:
			return {
				...state,
				token,
			};

		case LOGOUT:
			return initState;

		default:
			return state;
	}
}
