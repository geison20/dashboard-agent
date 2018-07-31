import axios from "../helpers/axios";

export const create = async ({
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
