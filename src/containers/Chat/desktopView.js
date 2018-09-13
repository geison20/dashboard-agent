import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Divider } from "antd";

import ChatUsers from "./chatusers";
import Messages from "./messages";
import ComposeMessage from "./composMessage";
import chatManager from "../../settings/pusher";
import { getClient } from "../../services/ClientService";
import appActions from "../../redux/app/actions";
import {
	addNewNotification,
	removeNotification,
} from "../../redux/chat/actions";

import { ChatWindow, ChatBox, ToggleViewProfile } from "./message.style";

const { changeStatus } = appActions;

class DesktopView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			agentAvatar: null,
			currentUser: null,
			client: null,
			pusherClients: [],
			pusherAgents: [],
			pusherMessages: [],
			searchClientModal: false,
			isTypingIn: {
				name: null,
				typing: false,
			},
		};
	}

	subscribeWaitingRoom = (currentUser, waitingRoomId) => {
		const { addNewNotification, removeNotification } = this.props;

		currentUser.subscribeToRoom({
			roomId: waitingRoomId,
			hooks: {
				onUserCameOnline: ({ id, customData: { name } }) => {
					addNewNotification({ id, name });

					this.setState({
						pusherClients: this.filterClients(currentUser.users),
						pusherAgents: this.filterAgents(currentUser.users),
					});
				},
				onUserWentOffline: ({ id }) => {
					removeNotification(id);

					this.setState({
						pusherClients: this.filterClients(currentUser.users),
						pusherAgents: this.filterAgents(currentUser.users),
					});
				},
			},
		});
	};

	handleOnlineOffline = async (isOnlineChecked) => {
		const { agentIdPusher, waitingRoomId, changeStatus } = this.props;

		const currentUser = await chatManager(agentIdPusher);

		// change global status to client
		changeStatus();

		// online
		if (isOnlineChecked === true) {
			this.subscribeWaitingRoom(currentUser, waitingRoomId);

			this.filterClients(currentUser.users).forEach(async (client) => {
				const { email, accountId } = client.customData;

				const {
					data: { privateRoomId },
				} = await getClient({ email, accountId });

				currentUser.subscribeToRoom({
					roomId: privateRoomId,
					messageLimit: 100,
					hooks: {
						onNewMessage: (message) => {
							console.log(message);
							// this.handleOutputMessage(message);
						},
					},
				});
			});

			this.setState({
				currentUser,
				agentAvatar: currentUser.avatarURL,
				pusherClients: this.filterClients(currentUser.users),
				pusherAgents: this.filterAgents(currentUser.users),
			});
		} else {
			await currentUser.leaveRoom({ roomId: waitingRoomId });

			this.setState({
				currentUser: null,
				agentAvatar: null,
				selectClient: null,
				pusherClients: [],
				pusherAgents: [],
				pusherMessages: [],
			});
		}
	};

	filterClients = (clients) =>
		clients.filter(
			(client) =>
				client.presence.state === "online" && client.id.startsWith("client"),
		);

	filterAgents = (agents) =>
		agents.filter(
			(agent) =>
				agent.presence.state === "online" && agent.id.startsWith("agent"),
		);

	handleSelectedClient = async ({ customData, id }) => {
		this.setState({
			pusherMessages: [],
		});

		const { currentUser } = this.state;
		const { email, accountId } = customData;
		const {
			data: { privateRoomId },
		} = await getClient({ email, accountId });

		currentUser.subscribeToRoom({
			roomId: privateRoomId,
			messageLimit: 100,
			hooks: {
				onNewMessage: (message) => {
					const { selectClient } = this.state;
					const { senderId } = message;

					if (senderId === selectClient.id) this.handleOutputMessage(message);
				},
				onUserStartedTyping: (client) => {
					const { selectClient } = this.state;
					if (selectClient && client.id === selectClient.id)
						this.setState({
							isTypingIn: {
								name: client.name,
								typing: true,
							},
						});
				},
				onUserStoppedTyping: (client) => {
					const { selectClient } = this.state;
					if (selectClient && client.id === selectClient.id)
						this.setState({
							isTypingIn: {
								name: null,
								typing: false,
							},
						});
				},
			},
		});

		this.setState({ privateRoomId, selectClient: { id, customData } });
	};

	handleOutputMessage = (message) => {
		this.setState({
			pusherMessages: [message, ...this.state.pusherMessages].sort(
				(left, right) =>
					moment.utc(left.createdAt).diff(moment.utc(right.createdAt)),
			),
		});
	};

	handleTypingMessage = async () =>
		await this.state.currentUser.isTypingIn({
			roomId: this.state.privateRoomId,
		});

	handleInputMessage = async (message) => {
		const { privateRoomId, currentUser } = this.state;

		await currentUser.sendMessage({
			text: message,
			roomId: privateRoomId,
		});
	};

	render() {
		const {
			agentAvatar,
			selectClient,
			pusherMessages,
			pusherClients,
			pusherAgents,
			isTypingIn,
		} = this.state;

		return (
			<ChatWindow className="ChatWindow">
				<ChatUsers
					pusherClients={pusherClients}
					pusherAgents={pusherAgents}
					handleSelectedClient={this.handleSelectedClient}
					handleOnlineOffline={this.handleOnlineOffline}
				/>
				<ChatBox style={{ height: "100%" }}>
					<ToggleViewProfile>
						{selectClient && (
							<div>
								<strong>{selectClient.customData.name}</strong>
								<Divider type="vertical" />
								{selectClient.customData.email}
								<Divider type="vertical" />
								{selectClient.customData.phone}
							</div>
						)}
					</ToggleViewProfile>

					<Messages
						agentAvatar={agentAvatar}
						isTypingIn={isTypingIn}
						messages={pusherMessages}
					/>

					<ComposeMessage
						handleInputMessage={this.handleInputMessage}
						handleTypingMessage={this.handleTypingMessage}
						autosize={{ minRows: 2, maxRows: 6 }}
					/>
				</ChatBox>
			</ChatWindow>
		);
	}
}

export default connect(
	({
		Agent: {
			agent: { email, id },
		},
		Account: { account },
	}) => ({
		agentIdPusher: `agent_${email}_${account.token}`,
		waitingRoomId: account.waitingRoomId,
	}),
	{ changeStatus, addNewNotification, removeNotification },
)(DesktopView);
