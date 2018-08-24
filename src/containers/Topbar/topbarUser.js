import React, { Component } from "react";
import { Avatar, Badge } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";

import { connect } from "react-redux";
import Popover from "../../components/uielements/popover";
import { logout } from "../../redux/auth/actions";
import TopbarDropdownWrapper from "./topbarDropdown.style";

class TopbarUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			styleStatus: {
				backgroundColor: null,
			},
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

	render() {
		const { gravatarPicture, logout } = this.props;

		const content = (
			<TopbarDropdownWrapper className="isoUserDropdown">
				<Popover content={this.contentStatus()} placement="left">
					<a className="isoDropdownLink">Status</a>
				</Popover>

				<a className="isoDropdownLink" onClick={logout}>
					<FormattedMessage id="topbar.logout" />
				</a>
			</TopbarDropdownWrapper>
		);

		return (
			<Popover
				content={content}
				trigger="click"
				visible={this.state.visible}
				onVisibleChange={this.handleVisibleChange}
				arrowPointAtCenter={true}
				placement="bottomLeft"
			>
				<Badge
					count={this.state.count}
					overflowCount={10}
					title="Notificações"
					showZero
					style={this.state.styleStatus}
				>
					{gravatarPicture ? (
						<Avatar
							shape="square"
							src={gravatarPicture}
							size="large"
							alt="Fotos de usuário"
						/>
					) : (
						<Avatar
							shape="square"
							icon="user"
							size="large"
							alt="Fotos de usuário"
						/>
					)}
				</Badge>
			</Popover>
		);
	}
}

injectIntl(TopbarUser, {
	withRef: false,
});

export default connect(
	(state) => ({
		gravatarPicture: state.Agent.agent.gravatar_thumb,
	}),
	{ logout },
)(TopbarUser);
