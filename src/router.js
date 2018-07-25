import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { connect } from "react-redux";

import App from "./containers/App/App";
import asyncComponent from "./helpers/AsyncFunc";
import hasPermission from "./helpers/hasPermission";
// import message from "./components/feedback/message";

const RestrictedRoute = ({
	component: Component,
	isLoggedIn,
	hasPermission = false,
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			isLoggedIn && hasPermission ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/signin",
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);
const Routes = ({ history, isLoggedIn, agentPermisson }) => {
	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route
					exact
					path={"/"}
					component={asyncComponent(() => import("./containers/Login/signin"))}
				/>
				<Route
					exact
					path={"/signin"}
					component={asyncComponent(() => import("./containers/Login/signin"))}
				/>
				<Route
					exact
					path={"/signup"}
					component={asyncComponent(() =>
						import("./containers/AccountCreate/"),
					)}
				/>
				<Route
					exact
					path={"/404"}
					component={asyncComponent(() => import("./containers/Page/404"))}
				/>
				<Route
					exact
					path={"/500"}
					component={asyncComponent(() => import("./containers/Page/500"))}
				/>
				<Route
					exact
					path={"/forgotpassword"}
					component={asyncComponent(() =>
						import("./containers/Page/forgotPassword"),
					)}
				/>
				<Route
					exact
					path={"/resetpassword"}
					component={asyncComponent(() =>
						import("./containers/Page/resetPassword"),
					)}
				/>

				<RestrictedRoute
					path="/dashboard"
					component={App}
					hasPermission={hasPermission(
						["admin", "agent", "read"],
						agentPermisson,
					)}
					isLoggedIn={isLoggedIn}
				/>
			</Switch>
		</ConnectedRouter>
	);
};

export default connect((state) => ({
	isLoggedIn: state.Authentication.token !== null,
	agentPermisson: state.Agent.agent ? state.Agent.agent.role : null,
}))(Routes);
