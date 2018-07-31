import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { injectIntl, FormattedMessage } from "react-intl";
import {
	Button,
	Modal,
	Form,
	Icon,
	Input,
	Row,
	Col,
	Select,
	Avatar,
	Popconfirm,
	Tag,
} from "antd";
import { prop, merge } from "ramda";

import LayoutContentWrapper from "../../components/utility/layoutWrapper.js";
import Box from "../../components/utility/box";
import ContentHolder from "../../components/utility/contentHolder";

import {
	getAgents,
	createAgent,
	updateAgent,
	changeStatusAgent,
} from "../../services/AgentService";

import { getRooms } from "../../services/RoomService";

import {
	TitleWrapper,
	ComponentTitle,
	TableWrapper,
	ButtonHolders,
	ActionWrapper,
} from "../Table/table.style";

const FormItem = Form.Item;
const Option = Select.Option;

class Agents extends Component {
	constructor(props) {
		super(props);

		this.state = {
			agents: [],
			confirmLoading: false,
			isVisible: false,
			formFieldsDisabled: false,
			rooms: [],
			roomsColors: [
				"magenta",
				"blue",
				"volcano",
				"cyan",
				"green",
				"geekblue",
				"purple",
				"gold",
				"red",
				"orange",
				"lime",
			],
			userColumnRow: null,
			tableLoading: true,
		};
	}

	async componentDidMount() {
		const { data: agents } = await getAgents();
		const { data: rooms } = await getRooms();

		this.setState({ agents, rooms, tableLoading: false });
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const { userColumnRow } = this.state;
		const { validateFields } = this.props.form;

		this.setState({ tableLoading: true });

		validateFields(async (err, values) => {
			if (err) return;

			try {
				if (userColumnRow) {
					values.id = userColumnRow.id;

					await updateAgent(values);
				} else {
					await createAgent(values);
				}

				const { data: agents } = await getAgents();

				this.setState({ agents, tableLoading: false, isVisible: false });
			} catch (error) {
				this.setState({ tableLoading: false });
				console.log(error);
			}
		});
	};

	handleForm = () => {
		const { getFieldDecorator } = this.props.form;
		const { rooms, userColumnRow, formFieldsDisabled } = this.state;

		return (
			<Form>
				<Row gutter={16}>
					<Col span={16}>
						<FormItem key="agentName" hasFeedback={true} label="Nome">
							{getFieldDecorator("agentName", {
								initialValue: prop("name", userColumnRow),
								rules: [
									{
										required: true,
										message: <FormattedMessage id="required.account.name" />,
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
										message: <FormattedMessage id="validations.whitespace" />,
									},
								],
							})(
								<Input
									disabled={formFieldsDisabled}
									prefix={
										<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
									}
									type="text"
									placeholder="Ex. Vitor Lima"
								/>,
							)}
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							required
							key="agentRole"
							hasFeedback={true}
							label="Permissão"
						>
							{getFieldDecorator("agentRole", {
								initialValue: prop("role", userColumnRow),
								rules: [
									{
										required: true,
										message: <FormattedMessage id="required" />,
									},
								],
							})(
								<Select allowClear>
									<Option value="read">
										<FormattedMessage id="roles.read" />
									</Option>
									<Option value="agent">
										<FormattedMessage id="roles.agent" />
									</Option>
									<Option value="admin">
										<FormattedMessage id="roles.admin" />
									</Option>
								</Select>,
							)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<FormItem key="agentEmail" hasFeedback={true} label="E-mail">
							{getFieldDecorator("agentEmail", {
								initialValue: prop("email", userColumnRow),
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
										message: <FormattedMessage id="validations.whitespace" />,
									},
								],
							})(
								<Input
									disabled={formFieldsDisabled}
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
					</Col>
					<Col span={12}>
						<FormItem key="agentRooms" hasFeedback={true} label="Salas">
							{getFieldDecorator("agentRooms", {
								rules: [
									{
										required: true,
										message: <FormattedMessage id="required" />,
									},
								],
							})(
								<Select allowClear mode="tags">
									{rooms.map(({ name, id }) => (
										<Option key={name} value={id.toString()}>
											{name}
										</Option>
									))}
								</Select>,
							)}
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	};

	columns = () => [
		{
			title: <FormattedMessage id="table.column.id" />,
			dataIndex: "id",
			key: "id",
			sorter: (a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			},
		},
		{
			title: <FormattedMessage id="table.column.thumb" />,
			dataIndex: "gravatar_thumb",
			key: "gravatar_thumb",
			render: (text) => (
				<Avatar src={text} size="large" shape="square" alt="Image user" />
			),
		},
		{
			title: <FormattedMessage id="table.column.name" />,
			dataIndex: "name",
			key: "name",
			sorter: (a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			},
		},
		{
			title: <FormattedMessage id="table.column.email" />,
			dataIndex: "email",
			key: "email",
			sorter: (a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			},
		},
		{
			title: <FormattedMessage id="table.column.permission" />,
			dataIndex: "role",
			key: "role",
			sorter: (a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			},
		},
		{
			title: <FormattedMessage id="table.column.rooms" />,
			dataIndex: "rooms",
			key: "rooms",
			width: "60px",
			render: (rooms) =>
				rooms.map((room, index) => (
					<Tag key={room.name} color={this.state.roomsColors[index]}>
						{room.name}
					</Tag>
				)),
		},
		{
			title: <FormattedMessage id="table.column.createAt" />,
			dataIndex: "createdAt",
			key: "createdAt",
			sorter: (a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			},
			render: (date) => moment(date).format("MMMM Do YYYY, h:mm:ss a"),
		},
		{
			title: <FormattedMessage id="table.column.status" />,
			dataIndex: "status",
			key: "status",
			sorter: (a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			},
			render: (status) => (
				<Tag
					color={
						status === "pending_confirmation"
							? "yellow"
							: status === "active"
								? "green"
								: "red"
					}
				>
					<FormattedMessage id={`agent.status.${status}`} />
				</Tag>
			),
		},
		{
			title: <FormattedMessage id="table.column.action" />,
			width: "60px",
			key: "action",
			render: (text, row) => {
				const { status, id } = row;

				const OnSubmitStatusAgents = async ({ to }) => {
					this.setState({ tableLoading: true });

					await changeStatusAgent(id, to);

					const { data: agents } = await getAgents();

					this.setState({ agents, tableLoading: false });
				};

				return (
					<ActionWrapper>
						<a
							onClick={() =>
								this.setState({
									isVisible: true,
									userColumnRow: row,
									formFieldsDisabled: true,
								})
							}
						>
							<i className="ion-android-create" />
						</a>

						{status === "active" || status === "pending_confirmation" ? (
							<Popconfirm
								title={<FormattedMessage id="inativate.agent" />}
								okText={<FormattedMessage id="yes" />}
								okType="danger"
								cancelText={<FormattedMessage id="no" />}
								placement="topRight"
								onConfirm={() => OnSubmitStatusAgents({ to: "inactive" })}
							>
								<a className="deleteBtn">
									<i className="ion-android-delete" />
								</a>
							</Popconfirm>
						) : (
							<a onClick={() => OnSubmitStatusAgents({ to: "active" })}>
								<i
									style={{ color: "#87d068" }}
									className="ion-android-checkmark-circle"
								/>
							</a>
						)}

						{status === "pending_confirmation" && (
							<a onClick={() => console.log("muda status")}>
								<i className="ion-android-mail" />
							</a>
						)}
					</ActionWrapper>
				);
			},
		},
	];

	render() {
		const { agents, confirmLoading, isVisible, tableLoading } = this.state;
		const { resetFields } = this.props.form;

		return (
			<LayoutContentWrapper>
				<Box>
					<ContentHolder style={{ marginTop: 0, overflow: "hidden" }}>
						<TitleWrapper>
							<ComponentTitle>Agentes</ComponentTitle>

							<ButtonHolders>
								<Button
									onClick={() => this.setState({ isVisible: true })}
									style={{ borderRadius: 4 }}
									type="primary"
									icon="user-add"
								>
									<FormattedMessage id="agent.add" />
								</Button>
							</ButtonHolders>
						</TitleWrapper>

						<Modal
							visible={isVisible}
							closable={true}
							afterClose={() => {
								this.setState({
									userColumnRow: null,
									formFieldsDisabled: false,
								});

								resetFields();
							}}
							confirmLoading={confirmLoading}
							onCancel={() => this.setState({ isVisible: false })}
							cancelText={"Cancelar"}
							title={"Adicionar novo agente"}
							okText={"Adicionar"}
							onOk={this.handleSubmit}
						>
							{this.handleForm()}
						</Modal>

						<TableWrapper
							rowKey="agents-list"
							columns={this.columns()}
							loading={tableLoading}
							dataSource={agents}
							className="isoSimpleTable"
							pagination={{
								// defaultPageSize: 1,
								hideOnSinglePage: true,
								total: agents.length,
								showTotal: (total, range) => {
									return `Showing ${range[0]}-${range[1]} of ${
										agents.length
									} Results`;
								},
							}}
						/>
					</ContentHolder>
				</Box>
			</LayoutContentWrapper>
		);
	}
}

const AgentsForm = Form.create()(Agents);

injectIntl(AgentsForm, {
	withRef: false,
});

export default connect()(AgentsForm);
