import axios from "../helpers/axios";

export const authenticate = async ({ email, password }) =>
	axios.post("/api/authentications", {
		email,
		password,
	});
