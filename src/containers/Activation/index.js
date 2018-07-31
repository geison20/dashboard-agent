import React, { Component } from "react";
import { connect } from "react-redux";
import { parse } from "query-string";

import Page404 from "../Page/404";

import { activate } from "../../services/AgentService";

class Activation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			token: null,
		};
	}

	async componentDidMount() {
		const {
			history: { push },
			location: { search },
		} = this.props;
		const { token } = parse(search);

		this.setState({ token });

		if (token) {
			try {
				await activate(token);

				push("/signin");
			} catch (error) {
				console.log(error.response);
			}
		}
	}

	render() {
		const { token } = this.state;

		return (
			!token && (
				<Page404
					title="page404.title"
					subtitle="page404.subtitle"
					description="page404.description"
					backButton="page404.backButton"
				/>
			)
		);
	}
}

export default connect()(Activation);
