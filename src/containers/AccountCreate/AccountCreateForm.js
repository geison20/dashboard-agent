import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Select, Icon, Input, Checkbox } from "antd";
import IntlMessages from "../../components/utility/intlMessages";

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

class AccountCreateForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { initialState } = this.props;
		const {
			getFieldDecorator,
			isFieldTouched,
			getFieldError,
		} = this.props.form;

		const accountNameValidation =
			isFieldTouched("accountName") && getFieldError("accountName");
		const accountDocumentValidation =
			isFieldTouched("accountDocument") && getFieldError("accountDocument");

		return (
			<div className="isoSignUpForm">
				<FormItem
					key="account"
					className="isoInputWrapper"
					hasFeedback={true}
					label="Nome da empresa"
					validateStatus={accountNameValidation ? "error" : ""}
					help={accountNameValidation || ""}
				>
					{getFieldDecorator("accountName", {
						initialValue: initialState.accountName,
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
							prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
							placeholder="Ex. Chat-commerce"
						/>,
					)}
				</FormItem>
			</div>
		);
	}
}

AccountCreateForm.propTypes = {
	onChangeAccountState: PropTypes.func.isRequired,
};

export default Form.create({
	onValuesChange: (props, changedValues, allValues) => {
		const { onChangeAccountState } = props;
		onChangeAccountState(changedValues);
	},
})(AccountCreateForm);
