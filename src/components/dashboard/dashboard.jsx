import React from 'react';
import { bindActionCreators } from 'redux';
import * as cryptoActions from '../../actions/cryptoActions'
import { connect } from 'react-redux';

const mapStateToProps=(state, _) =>({
  headerTitle: state.headerTitle
})

const mapDispatchToProps=(dispatch) =>({
  cryptoActions: bindActionCreators(cryptoActions, dispatch)
})

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    const {cryptoActions} = this.props;
    cryptoActions.setHeaderTitle('DashBoard')
  }

  render() {
    return (
      <>
        Welcome to Dashboard Page!
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
