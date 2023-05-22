import React from 'react';
import { bindActionCreators } from 'redux';
import * as cryptoActions from '../../actions/cryptoActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AlertCustom from '../../containers/utilities/alert';
import Loading from '../../containers/utilities/loading';

const mapStateToProps = (state, _) => ({
  cryptoTypes: state.crypto.cryptoTypes,
  error: state.crypto.error,
  loading: state.crypto.loading,
});

const mapDispatchToProps = (dispatch) => ({
  cryptoActions: bindActionCreators(cryptoActions, dispatch),
});

class CryptoAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptoAddForm: {
        id: null,
        name: '',
        crypto_type_id: null,
        price: null,
        validators: {},
        errors: {},
        touched: {},
      },
    };
  }

  componentWillMount() {
    const { cryptoActions } = this.props;
    cryptoActions.setHeaderTitle('Create Crypto');
  }

  componentDidMount() {
    const { cryptoActions } = this.props;
    cryptoActions.resetErrors([]);
    cryptoActions.getCryptoTypes();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { cryptoAddForm } = this.state;
    const { cryptoActions } = this.props;
    cryptoActions
      .addCrypto({
        name: cryptoAddForm.name,
        crypto_type_id: cryptoAddForm.crypto_type_id,
        price: cryptoAddForm.price,
      })
      .then((data) => {
        if (data) {
          toast.success('The crypto item was successfully created!');
          this.props.history.push('/crypto');
        }
      });
  }

  handleCancel() {
    const { history, cryptoActions } = this.props;
    cryptoActions.resetErrors();
    history.push('/crypto');
  }

  renderError = () => {
    const { error, cryptoActions } = this.props;
    if (error && error.failed) {
      return (
        <AlertCustom
          errors={error?.errors}
          open={error.failed}
          onClose={() => cryptoActions.resetErrors([])}
        />
      );
    }
  };

  render() {
    const { cryptoAddForm } = this.state;
    const { cryptoTypes, loading } = this.props;
    return (
      <>
        {this.renderError()}
        {loading.addCrypto ? <Loading /> : null}
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="mb-6">
            <label
              htmlFor="crypto-name"
              className="block mb-2 text-sm font-medium text-gray-900 required"
            >
              Crypto Name
            </label>
            <input
              type="text"
              id="crypto-name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              onChange={(e) =>
                this.setState({
                  cryptoAddForm: {
                    ...cryptoAddForm,
                    name: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="crypto-type"
              className="block mb-2 text-sm font-medium text-gray-900 required"
            >
              Crypto Type
            </label>
            <select
              onChange={(e) =>
                this.setState({
                  cryptoAddForm: {
                    ...cryptoAddForm,
                    crypto_type_id: +e.target.value,
                  },
                })
              }
              id="crypto-type"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            >
              <option></option>
              {cryptoTypes?.data?.map((item) => {
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
              className="block mb-2 text-sm font-medium text-gray-900 required"
            >
              Crypto Price
            </label>
            <input
              onChange={(e) =>
                this.setState({
                  cryptoAddForm: {
                    ...cryptoAddForm,
                    price: +e.target.value,
                  },
                })
              }
              type="number"
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
              onClick={() => this.handleCancel()}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 mr-1 border border-gray-200 inline-flex rounded-md px-3 py-2 text-sm font-medium items-center"
            >
              Cancel
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CryptoAdd));
