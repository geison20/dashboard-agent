import React, { Component } from "react";
import { connect } from "react-redux";
// import Input from '../../components/uielements/input';
import Scrollbars from "../../containers/Sidebar/customScrollBar";
import Button from "../../components/uielements/button";
import actions from "../../redux/chat/actions";
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

		console.log("this.props.pusherClients", this.props.pusherClients);
		this.state = {
			value: "",
			userIntoRoomsAssociatedByAgent: this.props.pusherClients,
		};
	}

	onSearch = (event) => {
		const value = event.target.value;
		const userIntoRoomsAssociatedByAgent = value ? [] : this.props.chatRooms;
		if (value) {
			this.props.chatRooms.forEach((chatRoom) => {
				if (
					chatRoom.otherUserInfo.name
						.toLowerCase()
						.includes(value.toLowerCase())
				) {
					userIntoRoomsAssociatedByAgent.push(chatRoom);
				}
			});
		}
		this.setState({ value, userIntoRoomsAssociatedByAgent });
	};

	render() {
		const { handleSelectedClient } = this.props;

		const { value, userIntoRoomsAssociatedByAgent } = this.state;

		const singleChatRoom = (client, index) => {
			const { createdAt, id, name } = client;

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
							src="https://bootdey.com/img/Content/avatar/avatar6.png"
						/>
					</div>
					<div className="userListsContent">
						<h4>{name}</h4>
						<div className="chatExcerpt">
							<p>{id}</p>
							<span className="userListsTime">{timeDifference(createdAt)}</span>
						</div>
					</div>
				</UserLists>
			);
		};

		return (
			<ChatSidebar>
				<SidebarSearchBox>
					<Input
						value={value}
						onChange={this.onSearch}
						placeholder="Search Contact"
					/>
				</SidebarSearchBox>
				<UserListsWrapper>
					<Scrollbars>
						{userIntoRoomsAssociatedByAgent.length === 0 ? (
							<HelperText
								text="No Conversation"
								className="messageHelperText"
							/>
						) : (
							userIntoRoomsAssociatedByAgent
								.filter((user) => user.presence.state === "online")
								.map(singleChatRoom)
						)}
					</Scrollbars>
				</UserListsWrapper>
			</ChatSidebar>
		);
	}
}

export default connect(
	(state) => {
		return {
			chatRooms: [
				{
					id: "-LHaN6BXK3Bs2ixYGbPi",
					lastMessage: "hola",
					lastMessageTime: 1535493602261,
					otherUserId: "-LHaN6BXK3Bs2ixYGbPh",
					otherUserInfo: {
						dob: "22/04/1992",
						gender: "Female",
						id: "-LHaN6BXK3Bs2ixYGbPh",
						language: "English",
						mobileNo: "9429692135",
						modalActive: true,
						name: "Ahmed",
						profileImageUrl:
							"https://thumb7.shutterstock.com/display_pic_with_logo/818215/552201991/stock-photo-beautiful-young-grinning-professional-black-woman-in-office-with-eyeglasses-folded-arms-and-552201991.jpg",
					},
					reverse: false,
					userId: "wt4TiasxgPrQ3dNwVZ55",
				},
			],
			selectedChatRoom: true,
		};
	},
	actions,
)(ChatRooms);
