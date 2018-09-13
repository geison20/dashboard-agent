import axios from "../helpers/axios";

export const getClient = async ({ email, accountId }) =>
	axios.get("/api/clients", { params: { email, accountId } });
