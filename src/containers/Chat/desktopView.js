import React, { Component } from "react";
import { connect } from "react-redux";
import ChatRooms from "./chatrooms";
import Messages from "./messages";
import ComposeMessage from "./composMessage";
import ViewProfile from "../../components/chat/viewProfile";
import chatManager from "../../settings/pusher";

import { ChatWindow, ChatBox, ToggleViewProfile } from "./message.style";

import actions from "../../redux/chat/actions";

class DesktopView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchClientModal: false,
			pusherClients: [],
			pusherRooms: [],
			pusherMessages: [],
			currentUser: null,
		};
	}

	componentDidMount = async () => {
		const { agentIdPusher } = this.props;

		const currentUser = await chatManager(agentIdPusher);

		// filtrar apenas por contas ids etc
		currentUser.rooms.forEach(({ id }) => {
			currentUser.subscribeToRoom({
				roomId: id,
				hooks: {
					onUserCameOnline: (client) => {
						this.setState({
							pusherClients: [client, ...this.state.pusherClients],
						});
					},
					onUserWentOffline: (client) => {
						this.setState({
							pusherClients: this.state.pusherClients.filter(
								(c) => c.id !== client.id,
							),
						});
					},
				},
			});
		});

		this.setState({
			currentUser,
			selectedClient: null,
			roomIdToSend: null,
			pusherClients: currentUser.users,
			pusherRooms: currentUser.rooms,
		});
	};

	handleSelectedClient = async (client) => {
		const { currentUser } = this.state;

		const getJoinableRooms = await currentUser.getJoinableRooms();

		if (getJoinableRooms.length > 0) {
			const Room = getJoinableRooms.filter((room) => room.name == client.id);

			await currentUser.joinRoom({
				roomId: Room[0].id,
			});

			this.setState({ roomIdToSend: Room[0].id });

			currentUser.subscribeToRoom({
				roomId: Room[0].id,
				messageLimit: 100,
				hooks: {
					onNewMessage: (message) => {
						this.handleOutputMessage(message);
					},
				},
			});
		}

		this.setState({ selectedClient: client });
	};

	handleOutputMessage = (message) => {
		this.setState({
			pusherMessages: [message, ...this.state.pusherMessages],
		});
	};

	handleInputMessage = async (message) => {
		const { roomIdToSend, currentUser } = this.state;
		console.log(roomIdToSend, message);
		await currentUser.sendMessage({
			text: message,
			roomId: roomIdToSend,
		});
	};

	render() {
		const { pusherClients, selectedClient, pusherMessages } = this.state;

		return (
			<ChatWindow className="ChatWindow">
				{pusherClients.length > 0 && (
					<ChatRooms
						pusherClients={pusherClients}
						handleSelectedClient={this.handleSelectedClient}
					/>
				)}

				<ChatBox style={{ height: "100%" }}>
					<ToggleViewProfile>
						{selectedClient && (
							<span
							// onClick={() =>
							// 	toggleViewProfile(selectedClient.otherUserInfo)
							// }
							>
								{selectedClient.name}
							</span>
						)}
					</ToggleViewProfile>

					<Messages messages={pusherMessages} />

					<ComposeMessage
						handleInputMessage={this.handleInputMessage}
						autosize={{ minRows: 2, maxRows: 6 }}
					/>
				</ChatBox>

				{/* {viewProfile !== false ? (
					<ViewProfile
						user={selectedClient.otherUserInfo}
						toggleViewProfile={toggleViewProfile}
						viewProfile={viewProfile}
					/>
				) : (
					""
				)} */}
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
		agentIdPusher: `agent_${email}_${id}_${account.id}`,
	}),
	actions,
)(DesktopView);
