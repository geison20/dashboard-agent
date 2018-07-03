import actions from "./actions";

const initState = {};

export default function authReducer(state = initState, action) {
	switch (action.type) {
		case actions.CREATE_ACCOUNT:
			return {
				...state,
			};

		default:
			return state;
	}
}
