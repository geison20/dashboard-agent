import React, { Component } from "react";
import { connect } from "react-redux";
import { timeDifference } from "../../helpers/utility";
import { MessageSingle, MessageChatWrapper } from "./message.style";

class Messages extends Component {
	scrollToBottom = () => {
		const messageChat = document.getElementById("messageChat");
		messageChat.scrollTop = messageChat.scrollHeight;
	};
	componentDidMount() {
		this.scrollToBottom();
	}
	componentDidUpdate() {
		this.scrollToBottom();
	}

	render() {
		const {
			user,
			userId,
			selectedChatRoom,
			messages,
			toggleViewProfile,
			toggleMobileProfile,
		} = this.props;

		const renderMessage = (message) => {

			return (
				<MessageSingle className="loggedUser" key={message.createdAt}>
					<div className="messageContent isUser">
						<div className="messageContentText">
							<p>{message.text}</p>
						</div>
						<div className="messageTime">
							<p>{timeDifference(message.createdAt)}</p>
						</div>
					</div>
					<div className="messageGravatar">
						<img
							alt="#"
							src="https://cdn.iconscout.com/icon/premium/png-512-thumb/account-49-102982.png"
						/>
					</div>
				</MessageSingle>
			);

			// const isUser = userId === message.sender;
			// const messageUser = isUser ? user : selectedChatRoom.otherUserInfo;
			// if (isUser) {
			// 	return (
			// 		<MessageSingle className="loggedUser" key={message.messageTime}>
			// 			<div className="messageContent isUser">
			// 				<div className="messageContentText">
			// 					<p>{message.text}</p>
			// 				</div>
			// 				<div className="messageTime">
			// 					<p>{timeDifference(message.messageTime)}</p>
			// 				</div>
			// 			</div>
			// 			<div className="messageGravatar">
			// 				<img
			// 					alt="#"
			// 					src={messageUser.profileImageUrl}
			// 					onClick={() => {
			// 						toggleMobileProfile(true);
			// 						toggleViewProfile(messageUser);
			// 					}}
			// 				/>
			// 			</div>
			// 		</MessageSingle>
			// 	);
			// } else {
			// 	return (
			// 		<MessageSingle key={message.messageTime}>
			// 			<div className="messageGravatar">
			// 				<img
			// 					alt="#"
			// 					src={messageUser.profileImageUrl}
			// 					onClick={() => {
			// 						toggleMobileProfile(true);
			// 						toggleViewProfile(messageUser);
			// 					}}
			// 				/>
			// 			</div>
			// 			<div className="messageContent notUser">
			// 				<div className="messageContentText">
			// 					<p>{message.text}</p>
			// 				</div>
			// 				<div className="messageTime">
			// 					<p>{timeDifference(message.messageTime)}</p>
			// 				</div>
			// 			</div>
			// 		</MessageSingle>
			// 	);
			// }
		};

		return (
			<MessageChatWrapper id="messageChat">
				{messages.map(renderMessage)}
			</MessageChatWrapper>
		);
	}
}

export default connect()(Messages);
