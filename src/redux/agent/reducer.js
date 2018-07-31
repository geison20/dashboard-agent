import { SET_USER } from "./actions";

const initState = {
	agent: null,
};

export default function authReducer(state = initState, { type, agent }) {
	switch (type) {
		case SET_USER:
			return {
				...state,
				agent,
			};

		default:
			return state;
	}
}
