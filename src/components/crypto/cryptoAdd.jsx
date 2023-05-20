import React from 'react';
import { bindActionCreators } from 'redux';
import * as cryptoActions from '../../actions/cryptoActions';
import { connect } from 'react-redux';
import { CYRPTO_TYPE } from '../../contants/constants';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail, isEmpty } from 'validator';

const mapStateToProps = (state, _) => ({});

const mapDispatchToProps = (dispatch) => ({
  cryptoActions: bindActionCreators(cryptoActions, dispatch),
});

class CryptoAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptoData: {
        id: null,
        name: '',
        type: 0,
        price: 0,
      },
    };
  }

  componentWillMount() {
    const { cryptoActions } = this.props;
    cryptoActions.setHeaderTitle('Create Crypto');
  }

  handleSubmit() {
    const { cryptoData } = this.state;
    const { cryptoActions } = this.props;
    cryptoActions.addCrypto(cryptoData);
    toast.success('The crypto item was successfully created!');
    this.props.history.push('/crypto');
  }

  render() {
    const { cryptoData } = this.state;
    const { history } = this.props;
    return (
      <>
        <Form onSubmit={() => this.handleSubmit()}>
          <div className="mb-6">
            <label
              htmlFor="crypto-name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Crypto Name
            </label>
            <input
              type="text"
              id="crypto-name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              onChange={(e) =>
                this.setState({
                  cryptoData: { ...cryptoData, name: e.target.value },
                })
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="crypto-type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Crypto Type
            </label>
            <select
              onChange={(e) =>
                this.setState({
                  cryptoData: {
                    ...cryptoData,
                    type: +e.target.value,
                  },
                })
              }
              id="crypto-type"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            >
              <option></option>
              {CYRPTO_TYPE.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="crypto-price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Crypto Price
            </label>
            <input
              onChange={(e) =>
                this.setState({
                  cryptoData: {
                    ...cryptoData,
                    price: +e.target.value,
                  },
                })
              }
              type="text"
              id="crypto-price"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className="flex">
            <button
              type="submit"
              className="mr-1 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white inline-flex rounded-md px-3 py-2 text-sm font-medium items-center"
            >
              Submit
            </button>
            <button
              onClick={() => history.push('/crypto')}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 mr-1 border border-gray-200 inline-flex rounded-md px-3 py-2 text-sm font-medium items-center"
            >
              Cancel
            </button>
          </div>
        </Form>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CryptoAdd));
