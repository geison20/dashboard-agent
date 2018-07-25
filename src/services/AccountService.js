import axios from "../helpers/axios";

const AccountService = async ({
	accountName,
	agentName,
	email,
	password,
	captcha,
}) =>
	axios
		.post("/api/accounts", {
			accountName,
			agentName,
			email,
			password,
			["g-recaptcha-response"]: captcha,
		})
		.then((response) => response);

export default AccountService;
