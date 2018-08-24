export const LOGOUT = "LOGOUT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SET_ACCOUNT_TOKEN = "SET_ACCOUNT_TOKEN";
export const logout = () => ({
	type: LOGOUT,
});
export const loginSuccess = (payload) => {
	return {
		type: LOGIN_SUCCESS,
		payload,
	};
};

export default function() {}
