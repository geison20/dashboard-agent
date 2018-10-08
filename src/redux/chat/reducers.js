import {
	ADD_NOTIFICATION,
	REMOVE_NOTIFICATION,
	ADD_CLIENTS,
	ADD_AGENTS,
} from "./actions";
import { LOGOUT } from "../auth/actions";

const initState = { notifications: [], clients: [], agents: [] };

export default function chatReducer(
	state = initState,
	{ type, notification, id, clients, agents },
) {
	switch (type) {
		case ADD_NOTIFICATION:
			return {
				...state,
				notifications: [notification, ...state.notifications].filter(
					(notification) => notification.id.startsWith("client"),
				),
			};

		case ADD_CLIENTS:
			return {
				...state,
				clients: clients.filter(
					(client) =>
						client.presence.state === "online" &&
						client.id.startsWith("client"),
				),
			};

		case ADD_AGENTS:
			return {
				...state,
				agents: agents.filter(
					(agent) =>
						agent.presence.state === "online" && agent.id.startsWith("agent"),
				),
			};

		case REMOVE_NOTIFICATION:
			return {
				...state,
				notifications: [...state.notifications].filter(
					(notification) => notification.id !== id,
				),
			};

		case LOGOUT:
			return initState;

		default:
			return state;
	}
}
