import axios from "../helpers/axios";

export const getAgents = () =>
	axios.get("/api/agents").then((response) => response);

export const createAgent = ({
	agentName: name,
	agentRole: role,
	agentEmail: email,
	agentRooms: rooms,
}) =>
	axios
		.post("/api/agents", {
			name,
			role,
			email,
			rooms,
		})
		.then((response) => response);

export const updateAgent = ({ agentRole: role, agentRooms: rooms, id }) =>
	axios.put("/api/agents", {
		id,
		role,
		rooms,
	});

export const changeStatusAgent = (id, to) =>
	axios.put("/api/agents/status", { id, to }).then((response) => response);

export const activate = (token) => axios.put("/api/agents/activate", { token });
