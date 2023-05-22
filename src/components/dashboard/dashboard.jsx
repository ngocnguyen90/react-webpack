import React from 'react';
import { bindActionCreators } from 'redux';
import * as cryptoActions from '../../actions/cryptoActions';
import { connect } from 'react-redux';
import img from '../../../public/bitcoin-btc-logo.svg';
import xrp from '../../../public/xrp-xrp-logo.svg';
import dogecoin from '../../../public/dogecoin-logo.svg';

const mapStateToProps = (state, _) => ({
  headerTitle: state.headerTitle,
});

const mapDispatchToProps = (dispatch) => ({
  cryptoActions: bindActionCreators(cryptoActions, dispatch),
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { cryptoActions } = this.props;
    cryptoActions.setHeaderTitle('DashBoard');
  }

  render() {
    return (
      <>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <img
              src={img}
              className="h-auto max-w-full rounded-lg"
              alt="DogeCoin"
            />
          </div>
          <div>
            <img
              src={xrp}
              className="h-auto max-w-full rounded-lg"
              alt="DogeCoin"
            />
          </div>
          <div>
            <img
              src={dogecoin}
              className="h-auto max-w-full rounded-lg"
              alt="DogeCoin"
            />
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
