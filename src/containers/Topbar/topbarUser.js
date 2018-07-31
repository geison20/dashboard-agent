import React, { Component } from "react";
import { Avatar, Badge } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";

import { connect } from "react-redux";
import Popover from "../../components/uielements/popover";
import authAction from "../../redux/auth/actions";
import TopbarDropdownWrapper from "./topbarDropdown.style";

const { logout } = authAction;

class TopbarUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
		};
	}

	hide = () => {
		this.setState({ visible: false });
	};

	handleVisibleChange = () => {
		this.setState({ visible: !this.state.visible });
	};

	render() {
		const { gravatarPicture, logout } = this.props;

		const content = (
			<TopbarDropdownWrapper className="isoUserDropdown">
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
				<Badge count={20} overflowCount={10} title="Notificações" showZero>
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
