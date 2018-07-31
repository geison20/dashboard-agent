import React, { Component } from "react";
import { connect } from "react-redux";
import clone from "clone";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import options from "./options";
import Scrollbars from "../../containers/Sidebar/customScrollBar";
import { injectIntl, FormattedMessage } from "react-intl";
import SidebarWrapper from "./sidebar.style";
import appActions from "../../redux/app/actions";
import Logo from "../../containers/Sidebar/logo";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

const {
	toggleOpenDrawer,
	changeOpenKeys,
	changeCurrent,
	toggleCollapsed,
} = appActions;

const stripTrailingSlash = (str) => {
	if (str.substr(-1) === "/") {
		return str.substr(0, str.length - 1);
	}
	return str;
};

class Sidebar extends Component {
	constructor(props) {
		super(props);
	}

	handleClick = (e) => {
		this.props.changeCurrent([e.key]);
		if (this.props.app.view === "MobileView") {
			setTimeout(() => {
				this.props.toggleCollapsed();
				this.props.toggleOpenDrawer();
			}, 100);
		}
	};

	onOpenChange = (newOpenKeys) => {
		const { app, changeOpenKeys } = this.props;
		const latestOpenKey = newOpenKeys.find(
			(key) => !(app.openKeys.indexOf(key) > -1),
		);
		const latestCloseKey = app.openKeys.find(
			(key) => !(newOpenKeys.indexOf(key) > -1),
		);
		let nextOpenKeys = [];
		if (latestOpenKey) {
			nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
		}
		if (latestCloseKey) {
			nextOpenKeys = this.getAncestorKeys(latestCloseKey);
		}
		changeOpenKeys(nextOpenKeys);
	};

	getAncestorKeys = (key) => {
		const map = {
			sub3: ["sub2"],
		};
		return map[key] || [];
	};

	getMenuItem = ({ singleOption }) => {
		const url = stripTrailingSlash(this.props.url);
		const agentPermission = this.props.agentPermission;
		const { key, label, leftIcon, children, permissions } = singleOption;

		if (children) {
			return (
				<SubMenu
					key={key}
					title={
						<span className="isoMenuHolder">
							<i className={leftIcon} />
							<span className="nav-text">
								<FormattedMessage id={label} />
							</span>
						</span>
					}
				>
					{children.map((child) => {
						const linkTo = child.withoutDashboard
							? `/${child.key}`
							: `${url}/${child.key}`;
						return (
							<Menu.Item key={child.key}>
								<Link to={linkTo}>
									<FormattedMessage id={child.label} />
								</Link>
							</Menu.Item>
						);
					})}
				</SubMenu>
			);
		}

		return (
			permissions.some((permission) => permission === agentPermission) && (
				<Menu.Item key={key}>
					<Link to={`${url}/${key}`}>
						<span className="isoMenuHolder">
							<i className={leftIcon} />
							<span className="nav-text">
								<FormattedMessage id={label} />
							</span>
						</span>
					</Link>
				</Menu.Item>
			)
		);
	};

	render() {
		const { app, height } = this.props;
		const collapsed = clone(app.collapsed);
		const mode = collapsed === true ? "vertical" : "inline";

		return (
			<SidebarWrapper>
				<Sider
					trigger={null}
					collapsible={true}
					collapsed={collapsed}
					width={240}
					className="isomorphicSidebar"
				>
					<Logo collapsed={collapsed} />

					<Scrollbars style={{ height: height - 70 }}>
						<Menu
							onClick={this.handleClick}
							theme="dark"
							className="isoDashboardMenu"
							mode={mode}
							openKeys={collapsed ? [] : app.openKeys}
							selectedKeys={app.current}
							onOpenChange={this.onOpenChange}
						>
							{options.map((singleOption) =>
								this.getMenuItem({ singleOption }),
							)}
						</Menu>
					</Scrollbars>
				</Sider>
			</SidebarWrapper>
		);
	}
}

injectIntl(Sidebar, {
	withRef: false,
});

export default connect(
	(state) => ({
		app: state.App,
		height: state.App.height,
		agentPermission: state.Agent.agent.role,
	}),
	{ toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed },
)(Sidebar);
