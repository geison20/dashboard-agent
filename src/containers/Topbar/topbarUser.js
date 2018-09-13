import React, { Component } from "react";
import { Avatar, Badge, Icon, Card, Switch } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";

import { connect } from "react-redux";
import Popover from "../../components/uielements/popover";
import { logout } from "../../redux/auth/actions";
import TopbarDropdownWrapper from "./topbarDropdown.style";

const { Meta } = Card;

class TopbarUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,

			count: 0,
		};
	}

	hide = () => {
		this.setState({ visible: false });
	};

	handleVisibleChange = () => {
		this.setState({ visible: !this.state.visible });
	};

	contentStatus = () => (
		<div>
			<a onClick={() => this.handleChangeStatus("online")}>
				<Badge status="success" text="Online" />
			</a>
			<br />
			<a onClick={() => this.handleChangeStatus("away")}>
				<Badge status="default" text="Ausente" />
			</a>
			<br />
			<a onClick={() => this.handleChangeStatus("offline")}>
				<Badge status="error" text="Offiline" />
			</a>
		</div>
	);

	popOverContent = () => {
		const { agentName, agentEmail, gravatarPicture, logout } = this.props;

		return (
			<Card
				style={{ width: 300 }}
				actions={[
					<Icon type="setting" />,
					<Icon type="edit" />,
					<a className="isoDropdownLink" onClick={logout}>
						<FormattedMessage id="topbar.logout" />
					</a>,
				]}
			>
				<Meta
					avatar={
						<Avatar
							shape="circle"
							src={gravatarPicture}
							size="default"
							alt="Fotos de usuário"
						/>
					}
					title={agentName}
					description={agentEmail}
				/>
			</Card>
		);
	};

	// <TopbarDropdownWrapper className="isoUserDropdown">
	// 	<Popover content={this.contentStatus()} placement="left">
	// 		<a className="isoDropdownLink">Status</a>
	// 	</Popover>

	// <a className="isoDropdownLink" onClick={logout}>
	// 	<FormattedMessage id="topbar.logout" />
	// </a>
	// </TopbarDropdownWrapper>

	render() {
		const { agentName, agentOnline } = this.props;
		const { visible } = this.state;

		return (
			<Popover
				content={this.popOverContent()}
				trigger="click"
				visible={visible}
				onVisibleChange={this.handleVisibleChange}
				arrowPointAtCenter={true}
				placement="bottomLeft"
			>
				<Badge dot status={agentOnline ? "success" : "error"} offset={[0, 5]}>
					<span>{agentName}</span>
				</Badge>
			</Popover>
		);
	}
}

injectIntl(TopbarUser, {
	withRef: false,
});

export default connect(
	({ Agent, App }) => ({
		agentName: Agent.agent.name,
		agentEmail: Agent.agent.email,
		agentOnline: App.online,
		gravatarPicture: Agent.agent.gravatar_thumb,
	}),
	{ logout },
)(TopbarUser);
