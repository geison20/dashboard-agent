const actions = {
	CREATE_ACCOUNT: "CREATE_ACCOUNT",
	ACCOUNT_SUCESS_CREATE: "ACCOUNT_SUCESS_CREATE",
	SET_ACCOUNT: "SET_ACCOUNT",

	create: (payload) => {
		return {
			type: actions.CREATE_ACCOUNT,
			payload,
		};
	},
};

export default actions;
