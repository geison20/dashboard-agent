import actions from "./actions";

const initState = { accountCreateSucess: false, account: null };

export default function authReducer(state = initState, { type, account }) {
	switch (type) {
		case actions.CREATE_ACCOUNT:
			return {
				...state,
			};

		case actions.ACCOUNT_SUCESS_CREATE:
			return {
				...state,
				accountCreateSucess: true,
			};

		case actions.SET_ACCOUNT:
			return {
				...state,
				account,
			};

		default:
			return state;
	}
}
