import React, { Component } from "react";
import { connect } from "react-redux";
import { ComposeMessageWrapper, Textarea } from "./message.style";

class ComposeMessage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: "",
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ value: "" });
	}

	onChange = (event) => {
		this.props.handleTypingMessage();
		this.setState({ value: event.target.value });
	};

	onKeyPress = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();

			const { value } = this.state;

			if (value && value.length > 0) {
				this.props.handleInputMessage(value);
				this.setState({ value: "" });
			}
		}
	};

	render() {
		const { autosize } = this.props;
		const { value } = this.state;

		return (
			<ComposeMessageWrapper>
				<Textarea
					autosize={autosize}
					value={value}
					onChange={this.onChange}
					onKeyPress={this.onKeyPress}
					placeholder="Escreva uma mensagem ..."
				/>
			</ComposeMessageWrapper>
		);
	}
}

export default connect()(ComposeMessage);
