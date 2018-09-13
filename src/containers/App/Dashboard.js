import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Debounce } from "react-throttle";
import { ChatManager, TokenProvider } from "@pusher/chatkit";
import WindowResizeListener from "react-window-size-listener";

import { logout } from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import {
	addChatClients,
	addNewNotification,
	removeNotification,
} from "../../redux/chat/actions";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
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
			currentUser: null,
		};
	}

	subscribeWaitingRoom = (currentUser) => {
		const {
			addChatClients,
			addNewNotification,
			removeNotification,
			waitingRoomId,
		} = this.props;

		currentUser.subscribeToRoom({
			roomId: waitingRoomId,
			hooks: {
				onUserCameOnline: ({ id, customData: { name } }) => {
					addChatClients(currentUser.users);
					addNewNotification({ id, name });
					// this.setState({
					// 	pusherClients: this.filterClients(currentUser.users),
					// 	pusherAgents: this.filterAgents(currentUser.users),
					// });
				},
				onUserWentOffline: ({ id }) => {
					addChatClients(currentUser.users);
					removeNotification(id);
					// this.setState({
					// 	pusherClients: this.filterClients(currentUser.users),
					// 	pusherAgents: this.filterAgents(currentUser.users),
					// });
				},
			},
		});
	};

	componentDidMount = async () => {
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

		this.subscribeWaitingRoom(currentUser);
		console.log(currentUser);
	};

	render() {
		const {
			match: { url },
		} = this.props;
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

					<Topbar url={url} />

					<Layout style={{ flexDirection: "row", overflowX: "hidden" }}>
						<Sidebar url={url} />

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
			agent: { email },
		},
		Account: { account },
	}) => ({
		agentIdPusher: `agent_${email}_${account.token}`,
		waitingRoomId: account.waitingRoomId,
	}),
	{
		logout,
		toggleAll,
		addChatClients,
		addNewNotification,
		removeNotification,
	},
)(Dashboard);
