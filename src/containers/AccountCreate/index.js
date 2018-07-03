import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { Form, Icon, Input, Button } from "antd";

import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./style";
import accountActions from "../../redux/account/actions";

const FormItem = Form.Item;
const { create } = accountActions;

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			iconPassword: "lock",
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const form = this.props.form;
		const { create } = this.props;

		form.validateFields((err, values) => {
			if (!err) {
				create(values);
			}
		});
	};

	checkConfirm = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(["password-confirm"], { force: true });
		}
		callback();
	};

	checkPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue("password")) {
			this.setState({
				iconPassword: "lock",
			});
			callback(<IntlMessages id="required.password.confirm" />);
		} else {
			this.setState({
				iconPassword: "unlock",
			});
			callback();
		}
	};

	render() {
		const {
			getFieldDecorator,
			getFieldError,
			isFieldTouched,
		} = this.props.form;

		const buttonValidationDisabled =
			!isFieldTouched("accountName") ||
			!isFieldTouched("agentName") ||
			!isFieldTouched("password") ||
			!isFieldTouched("agentEmail") ||
			(!isFieldTouched("password-confirm") ||
				getFieldError("accountName") ||
				getFieldError("agentName") ||
				getFieldError("agentEmail") ||
				getFieldError("password")) ||
			getFieldError("password-confirm");

		return (
			<DocumentTitle title="Chat-commerce | Cadastro de usuário">
				<SignUpStyleWrapper className="isoSignUpPage">
					<div className="isoSignUpContentWrapper">
						<div className="isoSignUpContent">
							<div className="isoLogoWrapper">
								<Link to="/dashboard">
									<IntlMessages id="page.signInTitle" />
								</Link>
							</div>
							<Form onSubmit={this.handleSubmit}>
								<div className="isoSignUpForm">
									<FormItem
										key="accountName"
										className="isoInputWrapper"
										hasFeedback={true}
										label="Empresa"
									>
										{getFieldDecorator("accountName", {
											rules: [
												{
													required: true,
													message: <IntlMessages id="required.account.name" />,
												},
												{
													whitespace: true,
													message: <IntlMessages id="validations.whitespace" />,
												},
											],
										})(
											<Input
												prefix={
													<Icon
														type="home"
														style={{ color: "rgba(0,0,0,.25)" }}
													/>
												}
												type="text"
												placeholder="Ex. Chat-commerce"
											/>,
										)}
									</FormItem>

									<FormItem
										key="agent"
										className="isoInputWrapper"
										hasFeedback={true}
										label="Agente"
									>
										{getFieldDecorator("agentName", {
											rules: [
												{
													required: true,
													message: <IntlMessages id="required.account.name" />,
												},
												{
													whitespace: true,
													message: <IntlMessages id="validations.whitespace" />,
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
												type="text"
												placeholder="Ex. Vitor Lima"
											/>,
										)}
									</FormItem>

									<FormItem
										key="email-agent"
										className="isoInputWrapper"
										hasFeedback={true}
										label="E-mail do agente"
									>
										{getFieldDecorator("agentEmail", {
											rules: [
												{
													type: "email",
													message: <IntlMessages id="validations.email" />,
												},
												{
													required: true,
													message: <IntlMessages id="required.email" />,
												},
												{
													whitespace: true,
													message: <IntlMessages id="validations.whitespace" />,
												},
											],
										})(
											<Input
												prefix={
													<Icon
														type="solution"
														style={{ color: "rgba(0,0,0,.25)" }}
													/>
												}
												type="text"
												placeholder="Ex. vitor.lima@gmail.com"
											/>,
										)}
									</FormItem>

									<div className="isoInputWrapper isoLeftRightComponent">
										<FormItem
											className="margin-input-create"
											key="password"
											hasFeedback={true}
											label="Senha"
										>
											{getFieldDecorator("password", {
												rules: [
													{
														required: true,
														message: <IntlMessages id="required.password" />,
													},
													{
														whitespace: true,
														message: (
															<IntlMessages id="validations.whitespace" />
														),
													},
													{
														validator: this.checkConfirm,
													},
												],
											})(
												<Input
													prefix={
														<Icon
															type="lock"
															style={{ color: "rgba(0,0,0,.25)" }}
														/>
													}
													type="password"
													placeholder="Ex. ************"
												/>,
											)}
										</FormItem>
										<FormItem
											key="password-repeat"
											hasFeedback={true}
											label="Repita a senha"
										>
											{getFieldDecorator("password-confirm", {
												rules: [
													{
														required: true,
														message: (
															<IntlMessages id="required.password.confirmation" />
														),
													},
													{
														validator: this.checkPassword,
													},
													{
														whitespace: true,
														message: (
															<IntlMessages id="validations.whitespace" />
														),
													},
												],
											})(
												<Input
													prefix={
														<Icon
															type={this.state.iconPassword}
															style={{ color: "rgba(0,0,0,.25)" }}
														/>
													}
													type="password"
													placeholder="Ex. ************"
												/>,
											)}
										</FormItem>
									</div>

									<FormItem className="isoInputWrapper">
										<Button
											disabled={buttonValidationDisabled}
											style={{ width: "100%" }}
											type="primary"
											htmlType="submit"
										>
											<IntlMessages id="form.create.button.create" />
										</Button>
									</FormItem>
									<div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
										<Link to="/signin">
											<IntlMessages id="page.signUpAlreadyAccount" />
										</Link>
									</div>
								</div>
							</Form>
						</div>
					</div>
				</SignUpStyleWrapper>
			</DocumentTitle>
		);
	}
}

const SignUpForm = Form.create()(SignUp);

export default connect(
	(state) => ({
		isLoggedIn: state.Authentication.token !== null ? true : false,
	}),
	{ create },
)(SignUpForm);
