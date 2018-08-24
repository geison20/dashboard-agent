import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { Form, Icon, Input, Button, message } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import ReCAPTCHA from "react-google-recaptcha";

import SignUpStyleWrapper from "./style";
import { create } from "../../services/AccountService";

const FormItem = Form.Item;

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			iconPassword: "lock",
			captchaValid: false,
			valueCaptcha: null,
			createSucess: false,
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { form } = this.props;
		const { valueCaptcha } = this.state;

		form.validateFields((err, values) => {
			if (!err) {
				values.captcha = valueCaptcha;

				console.log("values =====>", values);
				create(values);
			}
		});
	};

	checkConfirm = (rule, value, callback) => {
		const form = this.props.form;
		const checkPasswordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,12}/;

		if (!checkPasswordRegExp.test(value)) {
			callback(<FormattedMessage id="required.password.invalid.characteres" />);
		}

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
			callback(<FormattedMessage id="required.password.confirm" />);
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

		const { captchaValid, createSucess } = this.state;

		const buttonValidationDisabled =
			!captchaValid ||
			!isFieldTouched("accountName") ||
			!isFieldTouched("agentName") ||
			!isFieldTouched("password") ||
			!isFieldTouched("email") ||
			(!isFieldTouched("password-confirm") ||
				getFieldError("accountName") ||
				getFieldError("agentName") ||
				getFieldError("email") ||
				getFieldError("password")) ||
			getFieldError("password-confirm");

		{
			createSucess && message.success("Conta criada com sucesso!", 3);
		}

		return (
			<DocumentTitle title="Chat-commerce | Cadastro de usuário">
				<SignUpStyleWrapper className="isoSignUpPage">
					<div className="isoSignUpContentWrapper">
						<div className="isoSignUpContent">
							<div className="isoLogoWrapper">
								<Link to="/dashboard">
									<FormattedMessage id="page.signInTitle" />
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
													message: (
														<FormattedMessage id="required.account.name" />
													),
												},
												{
													min: 3,
													message: (
														<FormattedMessage
															id="validations.min"
															values={{
																count: 3,
															}}
														/>
													),
												},
												{
													max: 80,
													message: (
														<FormattedMessage
															id="validations.max"
															values={{
																count: 80,
															}}
														/>
													),
												},
												{
													whitespace: true,
													message: (
														<FormattedMessage id="validations.whitespace" />
													),
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
													message: (
														<FormattedMessage id="required.account.name" />
													),
												},
												{
													min: 3,
													message: (
														<FormattedMessage
															id="validations.min"
															values={{
																count: 3,
															}}
														/>
													),
												},
												{
													max: 80,
													message: (
														<FormattedMessage
															id="validations.max"
															values={{
																count: 80,
															}}
														/>
													),
												},
												{
													whitespace: true,
													message: (
														<FormattedMessage id="validations.whitespace" />
													),
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
										label="E-mail"
									>
										{getFieldDecorator("email", {
											rules: [
												{
													type: "email",
													message: <FormattedMessage id="validations.email" />,
												},
												{
													required: true,
													message: <FormattedMessage id="required.email" />,
												},
												{
													whitespace: true,
													message: (
														<FormattedMessage id="validations.whitespace" />
													),
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
														message: (
															<FormattedMessage id="required.password" />
														),
													},
													{
														whitespace: true,
														message: (
															<FormattedMessage id="validations.whitespace" />
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
															<FormattedMessage id="required.password.confirmation" />
														),
													},
													{
														validator: this.checkPassword,
													},
													{
														whitespace: true,
														message: (
															<FormattedMessage id="validations.whitespace" />
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

									<FormItem className="isoInputWrapper isoCenterComponent">
										<ReCAPTCHA
											ref="recaptcha"
											sitekey="6LcrEGQUAAAAABGBMNQwZ6xCXYKMjhpB31Fnhsty"
											onChange={(value) =>
												this.setState({
													captchaValid: true,
													valueCaptcha: value,
												})
											}
										/>
									</FormItem>

									<FormItem className="isoInputWrapper">
										<Button
											disabled={buttonValidationDisabled}
											style={{ width: "100%" }}
											type="primary"
											htmlType="submit"
										>
											<FormattedMessage id="form.create.button.create" />
										</Button>
									</FormItem>

									<div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
										<Link to="/signin">
											<FormattedMessage id="form.create.signUpAlreadyAccount" />
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

injectIntl(SignUpForm, {
	withRef: false,
});

export default connect()(SignUpForm);
