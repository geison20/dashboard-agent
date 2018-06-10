import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import DocumentTitle from 'react-document-title';

import Input from "../../components/uielements/input";
import Checkbox from "../../components/uielements/checkbox";
import Button from "../../components/uielements/button";
import authAction from "../../redux/auth/actions";
import appAction from "../../redux/app/actions";
// import Auth0 from "../../helpers/auth0";
// import Firebase from "../../helpers/firebase";
// import FirebaseLogin from "../../components/firebase";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";

const { login } = authAction;
const { clearMenu } = appAction;

class SignIn extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      data: {
        email: "",
        password: "",
      }
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
  }

  handleInputOnChange (event) {
    const { name, value } = event.target;

    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn && nextProps.isLoggedIn === true) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleLogin () {
    const { login, clearMenu } = this.props;
    login(this.state.data);

    clearMenu();
    // this.props.history.push("/dashboard");
  }

  render() {
    const from = { pathname: "/dashboard" };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
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
                <div className="isoInputWrapper">
                  <Input
                    name="email"
                    size="large"
                    type="email"
                    placeholder="E-mail"
                    autoFocus
                    onChange={this.handleInputOnChange}
                  />
                </div>

                <div className="isoInputWrapper">
                  <Input
                    name="password"
                    size="large"
                    type="password"
                    placeholder="Senha"
                    onChange={this.handleInputOnChange}
                  />
                </div>

                <div className="isoInputWrapper isoLeftRightComponent">
                  <Checkbox>
                    <IntlMessages id="page.signInRememberMe" />
                  </Checkbox>
                  <Button type="primary" onClick={this.handleLogin}>
                    <IntlMessages id="page.signInButton" />
                  </Button>
                </div>

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

export default connect(
  state => ({
    isLoggedIn: state.Authentication.token !== null ? true : false
  }), { login, clearMenu }
)(SignIn);
