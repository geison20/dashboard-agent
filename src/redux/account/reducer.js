import { CREATE_ACCOUNT, SET_ACCOUNT } from "./actions";
import { LOGOUT } from "../auth/actions";

const initState = { account: null };

export default function authReducer(state = initState, { type, account }) {
	switch (type) {
		case CREATE_ACCOUNT:
			return {
				...state,
			};

		case SET_ACCOUNT:
			return {
				...state,
				account,
			};

		case LOGOUT:
			return initState;

		default:
			return state;
	}
}
