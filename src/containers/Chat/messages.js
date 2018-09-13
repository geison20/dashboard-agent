import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

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

	renderMessage = (message) => {
		if (message.senderId.startsWith("agent")) {
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
						<img alt="#" src={this.props.agentAvatar} />
					</div>
				</MessageSingle>
			);
		} else {
			return (
				<MessageSingle className="loggedUser" key={message.createdAt}>
					<div className="messageContent notUser">
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
							src="http://aproer.org.br/wp-content/uploads/fg-avatar-anonymous-user-retina-lrg.png"
						/>
					</div>
				</MessageSingle>
			);
		}
	};

	render() {
		const { messages, isTypingIn } = this.props;

		return (
			<MessageChatWrapper id="messageChat">
				{messages.map(this.renderMessage)}

				{isTypingIn.typing && (
					<MessageSingle className="loggedUser">
						<div className="messageContent isUser">
							<div className="messageTime typing">
								<span className="typingClientName">
									{isTypingIn.name} Antunes está digitando
								</span>
								<ReactLoading
									color="#000000"
									type="bubbles"
									height={40}
									width={40}
								/>
							</div>
						</div>
					</MessageSingle>
				)}
			</MessageChatWrapper>
		);
	}
}

export default connect()(Messages);
