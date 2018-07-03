import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { Form, Icon, Input, Button, Alert } from "antd";

import authAction from "../../redux/auth/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";

const { login } = authAction;

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

	handleSubmit(e) {
		e.preventDefault();

		this.setState({
			loading: true,
		});

		const { login } = this.props;

		this.props.form.validateFields((err, values) => {
			if (!err) {
				login(values);
			}
		});
	}

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
		const { errorLoginAuthentication } = this.props;

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

									<div className="isoInputWrapper">
										{errorLoginAuthentication && (
											<Alert
												message="E-mail ou senha incorretos"
												type="error"
												showIcon
												closable
											/>
										)}
									</div>

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
	(state) => ({
		isLoggedIn: state.Authentication.token !== null ? true : false,
		errorLoginAuthentication: state.Authentication.errorLoginAuthentication,
	}),
	{ login },
)(FormCreated);
