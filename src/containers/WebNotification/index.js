import React, { Component } from "react";
import ReactWebNotification from "react-web-notification";
import PropTypes from "prop-types";

class WebNotification extends Component {
	constructor(props) {
		super(props);
	}

	render = () => {
		const { ignore, timeout, title, onClose, options } = this.props;

		return (
			<ReactWebNotification
				onClose={onClose}
				ignore={ignore}
				timeout={timeout}
				title={title}
				options={options}
			/>
		);
	};
}

WebNotification.propTypes = {
	title: PropTypes.string.isRequired,
	ignore: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
	options: PropTypes.shape({
		body: PropTypes.string,
	}),
};

WebNotification.defaultProps = {
	timeout: 5000,
	ignore: true,
};

export default WebNotification;
