import React from 'react';
import Header from './header';
import Menu from './menu';
import Dashboard from '../components/dashboard/dashboard';
import Crypto from '../components/crypto/crypto';
import { Switch, Route } from 'react-router-dom';
import CryptoAdd from '../components/crypto/cryptoAdd';
import Toast from './utilities/toast';
import CryptoEdit from '../components/crypto/cryptoEdit';
import Login from './login/login';
import { isLoggedIn } from '../utils/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';
import Authorization from '../containers/login/authorization';
import SignUp from './login/signup';

const mapStateToProps = (state, _) => ({
  loginInfor: state.loginInfor,
});

const mapDispatchToProps = (dispatch) => ({
  loginActions: bindActionCreators(loginActions, dispatch),
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loginInfor } = this.props;
    return (
      <div className="min-h-full">
        {isLoggedIn(loginInfor?.accountInfor) && (
          <>
            <Menu />
            <Header />
          </>
        )}
        <Toast />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Switch>
              <Route
                path="/login"
                exact
                render={() => (
                  <Authorization
                    component={Login}
                    isloginPage={true}
                    accountInfor={loginInfor?.accountInfor}
                  />
                )}
              />
              <Route
                path="/signup"
                exact
                render={() => (
                  <Authorization
                    component={SignUp}
                    isloginPage={true}
                    accountInfor={loginInfor?.accountInfor}
                  />
                )}
              />
              <Route
                path="/"
                exact
                render={() => (
                  <Authorization
                    component={Dashboard}
                    accountInfor={loginInfor?.accountInfor}
                  />
                )}
              />
              <Route
                path="/crypto"
                exact
                render={() => (
                  <Authorization
                    component={Crypto}
                    accountInfor={loginInfor?.accountInfor}
                  />
                )}
              />
              <Route
                path="/crypto/add"
                exact
                render={() => (
                  <Authorization
                    component={CryptoAdd}
                    accountInfor={loginInfor?.accountInfor}
                  />
                )}
              />
              <Route
                path="/crypto/edit/:id"
                exact
                render={() => (
                  <Authorization
                    component={CryptoEdit}
                    accountInfor={loginInfor?.accountInfor}
                  />
                )}
              />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
