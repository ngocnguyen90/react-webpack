import React from 'react';
import Header from './header';
import Menu from './menu';
import Dashboard from '../components/dashboard/dashboard';
import Crypto from '../components/crypto/crypto';
import { Switch, Route } from 'react-router-dom';
import CryptoAdd from '../components/crypto/cryptoAdd';
import Toast from './utilities/toast';
import CryptoEdit from '../components/crypto/cryptoEdit';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="min-h-full">
        <Menu />
        <Header />
        <Toast />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Switch>
            <Route
              path="/dashboard"
              exact
              render={() => (
                <Dashboard />
              )}
            />
            <Route
              path="/crypto"
              exact
              render={() => (
                <Crypto />
              )}
            />
            <Route
              path="/crypto/add"
              exact
              render={() => (
                <CryptoAdd />
              )}
            />
            <Route
              path="/crypto/edit/:id"
              exact
              render={() => (
                <CryptoEdit />
              )}
            />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default Main;
