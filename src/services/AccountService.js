import axios from "../helpers/axios";

const AccountService = async ({
	accountName,
	agentName,
	agentEmail,
	password,
}) =>
	axios
		.post("/api/accounts", {
			accountName,
			agentName,
			agentEmail,
			password,
		})
		.then((response) => response);

export default AccountService;
