import React, { Component } from "react";
import WindowResizeListener from "react-window-size-listener";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Debounce } from "react-throttle";

import { logout } from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import AppRouter from "./AppRouter";
import { siteConfig } from "../../settings";
import AppHolder from "./commonStyle";
import "./global.css";

const { Content, Footer } = Layout;
const { toggleAll } = appActions;

export class Dashboard extends Component {
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
	() => ({}),
	{ logout, toggleAll },
)(Dashboard);
