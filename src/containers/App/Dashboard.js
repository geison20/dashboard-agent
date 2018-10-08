import React, { Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { Debounce } from "react-throttle";
import ChatEngineCore from "chat-engine";
import deepstream from "deepstream.io-client-js";

import { ChatManager, TokenProvider } from "@pusher/chatkit";

import WindowResizeListener from "react-window-size-listener";

import { logout } from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import {
	addChatClients,
	addChatAgents,
	addNewNotification,
	removeNotification,
} from "../../redux/chat/actions";

import { getClient } from "../../services/ClientService";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import WebNotification from "../WebNotification";
import AppRouter from "./AppRouter";
import { siteConfig } from "../../settings";
import AppHolder from "./commonStyle";
import "./global.css";

const { Content, Footer } = Layout;
const { toggleAll } = appActions;

export class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			deepstreamClient: null,
			clientsOnline: [],
			allUsersInList: [],
			currentUser: null,
			WebNotificationIgnore: true,
			webNotificationTitle: "",
			webNotificationOptions: {
				body: "",
			},
		};
	}

	joinPrivateRoom = async (email, accountId) => {
		const { currentUser } = this.state;
		const { clientSelect } = this.props;
		const {
			data: { privateRoomId },
		} = await getClient({ email, accountId });

		currentUser.subscribeToRoom({
			roomId: privateRoomId,
			messageLimit: 100,
			hooks: {
				onNewMessage: async (message) => {
					console.log(message);

					this.setState({
						WebNotificationIgnore: false,
						webNotificationTitle: `Cliente enviou uma nova mensagem`,
						webNotificationOptions: {
							body: `${message.text}`,
						},
					});
					// if (clientSelect && clientSelect.id === message.senderId) {
					// 	// setBoxMessage(message);
					// }
					// await currentUser.setReadCursor({
					// 	roomId: privateRoomId,
					// 	position: message.id,
					// });
				},
				// onNewReadCursor: (cursor) => {
				// 	console.log("================+>", cursor);

				// 	// this.setState({
				// 	// 	WebNotificationIgnore: false,
				// 	// 	webNotificationTitle: `Você tem uma nova mensagem`,
				// 	// 	webNotificationOptions: {
				// 	// 		body: `ooooi`,
				// 	// 	},
				// 	// });
				// },
			},
		});
	};

	handleNotificationOnClose = () => {
		this.setState({
			WebNotificationIgnore: true,
			webNotificationTitle: "",
			webNotificationOptions: {
				body: "",
			},
		});
	};

	unsubscribeWaitingRoom = async () =>
		await this.state.currentUser.leaveRoom({
			roomId: this.props.waitingRoomId,
		});

	subscribeWaitingRoom = () => {
		const {
			addChatClients,
			addChatAgents,
			addNewNotification,
			removeNotification,
			waitingRoomId,
		} = this.props;

		const { currentUser } = this.state;

		currentUser.subscribeToRoom({
			roomId: waitingRoomId,
			hooks: {
				onUserCameOnline: ({ id, customData: { name, email, accountId } }) => {
					addChatClients(currentUser.users);
					addChatAgents(currentUser.users);

					if (id.startsWith("client")) {
						// addNewNotification({ id, name });

						this.setState({
							WebNotificationIgnore: false,
							webNotificationTitle: `${name} acabou de entrar`,
							webNotificationOptions: {
								body: `${email}`,
							},
						});

						this.joinPrivateRoom(email, accountId);
					}
				},
				onUserWentOffline: ({ id }) => {
					addChatClients(currentUser.users);
					addChatAgents(currentUser.users);
					// removeNotification(id);
				},
			},
		});
	};

	subscribePrivateRooms = (currentUser) => {
		currentUser.users
			.filter(
				(client) =>
					client.id.startsWith("client") && client.presence.state === "online",
			)
			.forEach(async (client) => {
				const { email, accountId } = client.customData;

				const {
					data: { privateRoomId },
				} = await getClient({ email, accountId });

				currentUser.subscribeToRoom({
					roomId: privateRoomId,
					messageLimit: 100,
					// hooks: {
					// 	onNewMessage: (message) => {
					// 		console.log(message);
					// 		// this.handleOutputMessage(message);
					// 	},
					// },
				});
			});
	};

	handleOnlineOffline = async (checked) => {
		const { addChatClients, addChatAgents } = this.props;

		if (checked) {
			const { agentIdPusher } = this.props;

			const chatKit = new ChatManager({
				instanceLocator: "v1:us1:a55faaa0-561d-4a4e-afab-ac8e4383e38a",
				userId: agentIdPusher,
				tokenProvider: new TokenProvider({
					url: "http://localhost:5000/api/authentications/clients/chat",
					headers: {
						"accept-version": 1,
						"Accept-Language": "pt",
					},
				}),
			});

			const currentUser = await chatKit.connect();

			this.setState({ currentUser });

			this.subscribeWaitingRoom();

			addChatClients(currentUser.users);
			addChatAgents(currentUser.users);

			// this.subscribePrivateRooms(currentUser);
		} else {
			addChatClients([]);
			addChatAgents([]);

			this.unsubscribeWaitingRoom();
		}
	};

	deepstreamListChange = (users) => {
		console.log("Users subscribed ====>", users);
	};

	addUser = (recordName) => {
		const { deepstreamClient, allUsersInList } = this.state;

		if (recordName.startsWith("client")) {
			const clientUsername = recordName.split("/")[1];

			// console.log("===========================>", clientUsername);
			// deepstreamClient.record.snapshot(recordName, (err, data) => {
			// 	this.setState({
			// 		allUsersInList: [
			// 			{
			// 				recordName,
			// 				data,
			// 			},
			// 			...this.state.allUsersInList,
			// 		],
			// 	});
			// });
		}
	};

	componentWillMount = async () => {
		const { waitingRoomId, agentEmail, agentName } = this.props;

		const deepstreamClient = deepstream("localhost:6020").login(
			{ username: agentName },
			(success, data) =>
				console.log(
					agentName,
					"Agent Authenticantion Success: ",
					success,
					data,
				),
		);

		deepstreamClient.on("error", (err) => {
			console.log(err);
		});

		// deepstreamClient.presence.getAll((allClientsOnline) => {
		// 	console.log(allClientsOnline);
		// 	// this.setState({ clientsOnline })
		// });

		// deepstreamClient.presence.subscribe((username, isLoggedIn) => {
		// console.log(username);
		// if (isLoggedIn) {
		// 	this.setState({
		// 		WebNotificationIgnore: false,
		// 		webNotificationTitle: `${username} acabou de entrar`,
		// 		webNotificationOptions: {},
		// 		clientsOnline: [...this.state.clientsOnline, username],
		// 	});
		// } else {
		// 	this.setState({
		// 		clientsOnline: this.state.clientsOnline.filter(
		// 			(client) => client != username,
		// 		),
		// 	});
		// }
		// });

		this.setState({ deepstreamClient });

		const agentId = `agents/${agentEmail}`;
		const List = waitingRoomId.toString();
		const WLRoom = deepstreamClient.record.getList(List);

		WLRoom.whenReady(() => {
			// WLRoom.delete();

			console.log(WLRoom.getEntries());
			if (!WLRoom.getEntries().some((recordName) => recordName === agentId)) {
				const recordClient = deepstreamClient.record.getRecord(agentId);

				recordClient.whenReady(() => {
					WLRoom.addEntry(agentId);

					recordClient.set({
						email: agentEmail,
					});

					// rec.discard();
				});
			}

			WLRoom.getEntries().forEach(this.addUser);

			// events
			// WLRoom.on("entry-added", this.addUser);
		});

		// const ChatEngine = ChatEngineCore.create(
		// 	{
		// 		publishKey: "pub-c-0727b69d-ce2a-4132-9283-aff2fe2f553e",
		// 		subscribeKey: "sub-c-998a701c-c1e4-11e8-b925-da34ce31b774",
		// 	},
		// 	{
		// 		globalChannel: waitingRoomId,
		// 		// debug: true,
		// 		// profile: true,
		// 		throwErrors: true,
		// 	},
		// );

		// ChatEngine.connect(agentEmail);

		// console.log(ChatEngine);

		// listening events
		// ChatEngine.on("$.connected", (chat) => {
		// 	console.log("Client connected!!!", chat);
		// });

		// ChatEngine.on("$.online.*", (payload) => {
		// 	console.log(payload);
		// });
	};

	render() {
		const {
			match: { url },
		} = this.props;

		const {
			webNotificationTitle,
			WebNotificationIgnore,
			webNotificationOptions,
			allUsersInList,
		} = this.state;

		console.log(allUsersInList);

		const appHeight = window.innerHeight;

		return (
			<AppHolder>
				<Layout style={{ height: appHeight }}>
					<Debounce time="1000" handler="onResize">
						<WindowResizeListener
							onResize={(windowSize) =>
								this.props.toggleAll(
									windowSize.windowWidth,
									windowSize.windowHeight,
								)
							}
						/>
					</Debounce>

					{WebNotificationIgnore === false && (
						<WebNotification
							onClose={this.handleNotificationOnClose}
							ignore={WebNotificationIgnore}
							title={webNotificationTitle}
							options={webNotificationOptions}
						/>
					)}

					<Topbar url={url} />

					<Layout style={{ flexDirection: "row", overflowX: "hidden" }}>
						<Sidebar url={url} handleOnlineOffline={this.handleOnlineOffline} />

						<Layout className="isoContentMainLayout">
							<Content
								className="isomorphicContent"
								style={{
									padding: "70px 0 0",
									flexShrink: "0",
									background: "#f1f3f6",
									position: "relative",
								}}
							>
								<AppRouter url={url} />
							</Content>
							<Footer
								style={{
									background: "#ffffff",
									textAlign: "center",
									borderTop: "1px solid #ededed",
								}}
							>
								{siteConfig.footerText}
							</Footer>
						</Layout>
					</Layout>
				</Layout>
			</AppHolder>
		);
	}
}

export default connect(
	({
		Agent: {
			agent: { email, name },
		},
		Account: { account },
		Chat: { clientSelect },
	}) => ({
		agentIdPusher: `agent_${email}_${account.token}`,
		agentEmail: email,
		agentName: name,
		waitingRoomId: account.waitingRoomId,
		clientSelect,
	}),
	{
		logout,
		toggleAll,
		addChatClients,
		addChatAgents,
		addNewNotification,
		removeNotification,
	},
)(Dashboard);
