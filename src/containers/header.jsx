import React from 'react';
import { bindActionCreators } from 'redux';
import * as cryptoActions from '../actions/cryptoActions'
import { connect } from 'react-redux';

const mapStateToProps=(state, _) =>({
  headerTitle: state.headerTitle
})

const mapDispatchToProps=(dispatch) =>({
  cryptoActions: bindActionCreators(cryptoActions, dispatch)
})

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {headerTitle}=this.props
    return (
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {headerTitle}
          </h1>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
