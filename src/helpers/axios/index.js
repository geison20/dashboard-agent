import axios from "axios";
import LS from "local-storage";

const mainInstance = axios.create({
	baseURL: "http://localhost:5000",
	responseType: "json",
	responseEncoding: "utf8",
	maxContentLength: 2000,
	headers: {
		"accept-version": 1,
		"Accept-Language": "pt",
	},
});

const userSession = LS.get("persist:root");

if (userSession) {
	const Authentication = JSON.parse(userSession.Authentication);

	mainInstance.defaults.headers.common["Authorization"] = `Bearer ${
		Authentication.token
	}`;
}

export default mainInstance;
