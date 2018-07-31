import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { connect } from "react-redux";

import Dashboard from "./containers/App/Dashboard";
import asyncComponent from "./helpers/AsyncFunc";
import hasPermission from "./helpers/hasPermission";

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isLoggedIn ? (
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
					path={"/activation"}
					component={asyncComponent(() => import("./containers/Activation"))}
				/>
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
					component={Dashboard}
					isLoggedIn={isLoggedIn}
				/>
			</Switch>
		</ConnectedRouter>
	);
};

export default connect((state) => ({
	isLoggedIn: state.Authentication.token !== null,
}))(Routes);
