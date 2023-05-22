import React from 'react';
import { withRouter } from 'react-router-dom';

class Authorization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { accountInfor, isloginPage } = this.props;
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (
      (!accountInfor?.accessToken && !isloginPage) ||
      accessToken === ''
    )
      return this.props.history.push('/login');
    if (
      accountInfor?.accessToken &&
      isloginPage &&
      accessToken !== ''
    )
      return this.props.history.push('/');
  }

  render() {
    const { component: Component } = this.props;
    return <Component />;
  }
}

export default withRouter(Authorization);
