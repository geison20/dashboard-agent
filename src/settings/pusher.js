import { ChatManager, TokenProvider } from "@pusher/chatkit";

const tokenProvider = new TokenProvider({
	url: "http://localhost:5000/api/authentications/clients/chat",
	headers: {
		"accept-version": 1,
		"Accept-Language": "pt",
	},
});

export default (userId) => {
	const chatKit = new ChatManager({
		instanceLocator: "v1:us1:a55faaa0-561d-4a4e-afab-ac8e4383e38a",
		userId,
		tokenProvider: tokenProvider,
	});

	return chatKit.connect()
}
