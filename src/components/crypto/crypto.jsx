import React from 'react';
import { bindActionCreators } from 'redux';
import * as cryptoActions from '../../actions/cryptoActions';
import { connect } from 'react-redux';
import CryptoLists from './cryptoLists';

const mapStateToProps = (state, _) => ({
  crypto: state.crypto,
});

const mapDispatchToProps = (dispatch) => ({
  cryptoActions: bindActionCreators(cryptoActions, dispatch),
});

class Crypto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
       <CryptoLists />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Crypto);
