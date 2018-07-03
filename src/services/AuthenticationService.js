import axios from "../helpers/axios";

const AuthenticationService = async ({ email, password }) =>
	axios
		.post("/api/authentications", {
			email,
			password,
		})
		.then((response) => response);

export default AuthenticationService;
