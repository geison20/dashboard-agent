import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import {
	Form,
	Steps,
	Icon,
	Input,
	Button,
	Alert,
	Checkbox,
	message,
} from "antd";

import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./style";
import AccountCreateForm from "./AccountCreateForm";

const Step = Steps.Step;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			currentStep: 0,
			account: {
				accountName: "",
			},
			agent: {},
			confirmation: {},
		};
	}

	getSteps = () => {
		const { account } = this.state;
		return [
			{
				title: "Conta",
				content: (
					<AccountCreateForm
						onChangeAccountState={this.onChangeAccountState}
						initialState={account}
					/>
				),
				icon: <Icon type="solution" />,
			},
			{
				title: "Agente",
				content: "Second-content",
				icon: <Icon type="user" />,
			},
			{
				title: "Confirmação",
				content: "Last-content",
				icon: <Icon type="smile-o" />,
			},
		];
	};

	onSubmit = () => {
		console.log("create account");
	};

	onChangeAccountState = (dataFromInput) => {
		this.setState({
			account: dataFromInput,
		});
	};

	next = () => {
		const currentStep = this.state.currentStep + 1;
		this.setState({ currentStep });
	};

	prev = () => {
		const currentStep = this.state.currentStep - 1;
		this.setState({ currentStep });
	};

	render() {
		const { currentStep } = this.state;
		const steps = this.getSteps();

		const {
			getFieldDecorator,
			getFieldsError,
			getFieldError,
			isFieldTouched,
		} = this.props.form;

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
							<div className="isoLogoWrapper">
								<Steps size="small" current={currentStep}>
									{steps.map(({ title, icon }) => (
										<Step key={title} title={title} icon={icon} />
									))}
								</Steps>
							</div>
							<Form>
								<div
									style={{
										marginBottom: "50px",
									}}
									className="isoInputWrapper"
								>
									{steps[this.state.currentStep].content}
								</div>

								<div className="isoInputWrapper isoLeftRightComponent">
									<Button
										type="primary btnCreate"
										size="small"
										disabled={this.state.currentStep == 0}
										onClick={() => this.prev()}
									>
										<Icon type="arrow-left" />
										<IntlMessages id="form.create.button.back" />
									</Button>
									{this.state.currentStep < steps.length - 1 && (
										<Button
											// disabled={hasErrors(getFieldsError())}
											type="primary btnCreate"
											size="small"
											onClick={() => this.next()}
										>
											<IntlMessages id="form.create.button.go" />
											<Icon type="arrow-right" />
										</Button>
									)}
									{this.state.currentStep === steps.length - 1 && (
										<Button
											// disabled={hasErrors(getFieldsError())}
											type="primary btnCreate"
											size="small"
											htmlType="submit"
											onClick={() => message.success("Processing complete!")}
										>
											<IntlMessages id="form.create.button.create" />
											<Icon type="check-circle-o" />
										</Button>
									)}
								</div>
							</Form>
							{/* <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
								<Link to="/signin">
									<IntlMessages id="page.signUpAlreadyAccount" />
								</Link>
							</div> */}
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
	{},
)(SignUpForm);
