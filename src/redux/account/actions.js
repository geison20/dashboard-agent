const actions = {
	CREATE_ACCOUNT: "CREATE_ACCOUNT",

	create: (payload) => {
		console.log("payload ====>", payload);
		return {
			type: actions.CREATE_ACCOUNT,
			payload,
		};
	},
};

export default actions;
