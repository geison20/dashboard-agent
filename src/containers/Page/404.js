import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Image from "../../image/rob.png";
import IntlMessages from "../../components/utility/intlMessages";
import FourZeroFourStyleWrapper from "./404.style";

class Page404 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { title, subtitle, description, backButton } = this.props;

		return (
			<FourZeroFourStyleWrapper className="iso404Page">
				<div className="iso404Content">
					<h1>
						<IntlMessages id={title} />
					</h1>
					<h3>
						<IntlMessages id={subtitle} />
					</h3>
					<p>
						<IntlMessages id={description} />
					</p>
					<button type="button">
						<Link to="/signin">
							<IntlMessages id={backButton} />
						</Link>
					</button>
				</div>

				<div className="iso404Artwork">
					<img alt="#" src={Image} />
				</div>
			</FourZeroFourStyleWrapper>
		);
	}
}

export default connect()(Page404);
