import React, { Component } from "react";
import { connect } from "react-redux";
import { Divider, Switch } from "antd";

import Scrollbars from "../../containers/Sidebar/customScrollBar";
import { timeDifference } from "../../helpers/utility";
import HelperText from "../../components/utility/helper-text";
import {
	UserListsWrapper,
	UserLists,
	SidebarSearchBox,
	Input,
	ChatSidebar,
} from "./message.style";

class ChatRooms extends Component {
	constructor(props) {
		super(props);
	}

	singleChatRoom = (client, index) => {
		const { handleSelectedClient } = this.props;
		const { createdAt, name } = client;

		const selectedClient = (event) => {
			event.stopPropagation();

			handleSelectedClient(client);
		};

		return (
			<UserLists key={index} onClick={selectedClient}>
				<div className="userListsGravatar">
					<img
						alt="#"
						style={{ width: 45, height: 45 }}
						src="http://aproer.org.br/wp-content/uploads/fg-avatar-anonymous-user-retina-lrg.png"
					/>
				</div>
				<div className="userListsContent">
					<h4>{name}</h4>
					<div className="chatExcerpt">
						<p>{client.customData.email}</p>
						<span className="userListsTime">{timeDifference(createdAt)}</span>
					</div>

					<div className="chatExcerpt">
						<p>{client.customData.phone || null}</p>
					</div>
				</div>
			</UserLists>
		);
	};

	render() {
		const { agents, clients } = this.props;

		return (
			<ChatSidebar>
				<SidebarSearchBox>
					{/* <Input
						value={value}
						onChange={this.onSearch}
						placeholder="Buscar clientes"
					/> */}
					{/* <Switch
						onChange={this.props.handleOnlineOffline}
						checkedChildren="Online"
						unCheckedChildren="Offline"
					/> */}
				</SidebarSearchBox>
				<Divider orientation="left">Agentes Online</Divider>
				<UserListsWrapper>
					<Scrollbars>
						{agents.length === 0 ? (
							<HelperText
								text="Nenhum agente online"
								className="messageHelperText"
							/>
						) : (
							agents.map((agent, index) => (
								<UserLists key={index}>
									<div className="userListsGravatar">
										<img
											alt="#"
											style={{ width: 45, height: 45 }}
											src={agent.avatarURL}
										/>
									</div>
									<div className="userListsContent">
										<h4>{agent.name}</h4>
										<div className="chatExcerpt">
											<p>{agent.customData.email}</p>
											<span className="userListsTime">
												{timeDifference(agent.createdAt)}
											</span>
										</div>
									</div>
								</UserLists>
							))
						)}
					</Scrollbars>
				</UserListsWrapper>
				<Divider orientation="left">Clientes Online</Divider>
				<UserListsWrapper>
					<Scrollbars>
						{clients.length === 0 ? (
							<HelperText
								text="Nenhum cliente online"
								className="messageHelperText"
							/>
						) : (
							clients.map(this.singleChatRoom)
						)}
					</Scrollbars>
				</UserListsWrapper>
			</ChatSidebar>
		);
	}
}

export default connect(({ Chat }) => ({
	clients: Chat.clients,
	agents: Chat.agents,
}))(ChatRooms);
