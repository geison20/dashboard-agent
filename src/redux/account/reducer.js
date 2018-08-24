import { CREATE_ACCOUNT, SET_ACCOUNT } from "./actions";

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

		default:
			return state;
	}
}
