import { SET_USER } from "./actions";
import { LOGOUT } from "../auth/actions";

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

		case LOGOUT:
			return initState;

		default:
			return state;
	}
}
