import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { Form, Icon, Input, Button } from "antd";
import jwtDecode from "jwt-decode";

import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";

import { authenticate } from "../../services/AuthenticationService";
import { loginSuccess } from "../../redux/auth/actions";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields();
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const {
			loginSuccess,
			form: { validateFields },
		} = this.props;

		this.setState({ loading: true });

		validateFields(async (err, values) => {
			if (err) return;

			try {
				const {
					data: { token },
				} = await authenticate(values);

				const { account, ...agent } = jwtDecode(token);

				loginSuccess({ account, agent, token });
			} catch (error) {}
		});
	};

	render() {
		const {
			getFieldDecorator,
			getFieldsError,
			getFieldError,
			isFieldTouched,
		} = this.props.form;

		const emailError = isFieldTouched("email") && getFieldError("email");
		const passwordError =
			isFieldTouched("password") && getFieldError("password");

		return (
			<DocumentTitle title="chat-commerce | Login">
				<SignInStyleWrapper className="isoSignInPage">
					<div className="isoLoginContentWrapper">
						<div className="isoLoginContent">
							<div className="isoLogoWrapper">
								<Link to="/dashboard">
									<IntlMessages id="page.signInTitle" />
								</Link>
							</div>

							<div className="isoSignInForm">
								<Form onSubmit={this.handleSubmit}>
									<FormItem
										className="isoInputWrapper"
										hasFeedback
										validateStatus={emailError ? "error" : ""}
										help={emailError || ""}
									>
										{getFieldDecorator("email", {
											rules: [
												{
													type: "email",
													message: <IntlMessages id="validations.email" />,
												},
												{
													required: true,
													message: <IntlMessages id="required.email" />,
												},
											],
										})(
											<Input
												prefix={
													<Icon
														type="user"
														style={{ color: "rgba(0,0,0,.25)" }}
													/>
												}
												placeholder="E-mail"
											/>,
										)}
									</FormItem>

									<FormItem
										className="isoInputWrapper"
										hasFeedback
										validateStatus={passwordError ? "error" : ""}
										help={passwordError || ""}
									>
										{getFieldDecorator("password", {
											rules: [
												{
													required: true,
													message: <IntlMessages id="required.password" />,
												},
											],
										})(
											<Input
												type="password"
												prefix={
													<Icon
														type="lock"
														style={{ color: "rgba(0,0,0,.25)" }}
													/>
												}
												placeholder="Senha"
											/>,
										)}
									</FormItem>

									<FormItem className="isoInputWrapper">
										<Button
											disabled={hasErrors(getFieldsError())}
											style={{ width: "100%" }}
											type="primary"
											htmlType="submit"
										>
											<IntlMessages id="page.signInButton" />
										</Button>
									</FormItem>
								</Form>

								<div className="isoCenterComponent isoHelperWrapper">
									<Link to="/forgotpassword" className="isoForgotPass">
										<IntlMessages id="page.signInForgotPass" />
									</Link>
									<Link to="/signup">
										<IntlMessages id="page.signInCreateAccount" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</SignInStyleWrapper>
			</DocumentTitle>
		);
	}
}

const FormCreated = Form.create()(SignIn);

export default connect(
	() => ({}),
	{ loginSuccess },
)(FormCreated);
