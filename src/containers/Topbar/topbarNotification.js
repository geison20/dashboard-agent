import React, { Component } from "react";
import { Popover } from "antd";
import { connect } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";

import TopbarDropdownWrapper from "./topbarDropdown.style";

class TopbarNotification extends Component {
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
		const { notifications } = this.props;

		const content = (
			<TopbarDropdownWrapper className="topbarNotification">
				<div className="isoDropdownHeader">
					<h3>
						<FormattedMessage id="topbar.notification" />
					</h3>
				</div>
				<div className="isoDropdownBody">
					{notifications.map((notification) => (
						<a className="isoDropdownListItem" key={notification.id}>
							<h5>{notification.name}</h5>
							<p>acabou de ficar online</p>
						</a>
					))}
				</div>
				<a className="isoViewAllBtn">
					<FormattedMessage id="topbar.viewAll" />
				</a>
			</TopbarDropdownWrapper>
		);
		return (
			<Popover
				content={content}
				trigger="click"
				visible={this.state.visible}
				onVisibleChange={this.handleVisibleChange}
				placement="bottomLeft"
			>
				<div className="isoIconWrapper">
					<i className="ion-android-notifications" />
					<span>{notifications.length}</span>
				</div>
			</Popover>
		);
	}
}

injectIntl(TopbarNotification, {
	withRef: false,
});

export default connect(({ Chat: { notifications } }) => ({
	notifications,
}))(TopbarNotification);
