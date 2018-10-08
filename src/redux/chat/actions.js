export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const ADD_CLIENTS = "ADD_CLIENTS";
export const ADD_AGENTS = "ADD_AGENTS";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

export const addNewNotification = (notification) => ({
	type: ADD_NOTIFICATION,
	notification,
});

export const addChatClients = (clients) => ({
	type: ADD_CLIENTS,
	clients,
});

export const addChatAgents = (agents) => ({
	type: ADD_AGENTS,
	agents,
});

export const removeNotification = (id) => ({
	type: REMOVE_NOTIFICATION,
	id,
});

export default function() {}
