import React from 'react';
import { bindActionCreators } from 'redux';
import * as cryptoActions from '../../actions/cryptoActions';
import { connect } from 'react-redux';
import CryptoSearch from './cryptoSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faAdd,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import Modal from '../../containers/utilities/modal';
import { toast } from 'react-hot-toast';
import Loading from '../../containers/utilities/loading';
import Pagination from '../../containers/utilities/pagination';

const mapStateToProps = (state, _) => ({
  crypto: state.crypto.cryptoLists,
  headerTitle: state.headerTitle,
  searchData: state.searchData,
  loading: state.crypto.loading,
  error: state.crypto.error,
});

const mapDispatchToProps = (dispatch) => ({
  cryptoActions: bindActionCreators(cryptoActions, dispatch),
});

class CryptoLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTimeout: null,
      notFound: false,
      isCheckAll: false,
      listChecked: [],
      cryptoLists: [],
      cryptoId: null,
      modal: {
        open: false,
        title: '',
        message: '',
        saveButton: {
          color: '',
          hover: '',
        },
      },
    };
  }

  componentDidMount() {
    const { cryptoActions } = this.props;
    cryptoActions.setHeaderTitle('Crypto Lists');
    cryptoActions.getCryptoLists();
  }

  addCrypto() {
    this.props.history.push('/crypto/add');
  }

  handleSelectAll(e) {
    const { checked } = e.target;
    const { crypto } = this.props;
    if (checked) {
      const newListChecked = crypto.data.map((item) => item.id);
      this.setState({
        isCheckAll: checked,
        listChecked: newListChecked,
      });
    } else this.setState({ isCheckAll: checked, listChecked: [] });
  }

  handleSelect(e) {
    const { crypto } = this.props;
    const { listChecked } = this.state;
    const { id, checked } = e.target;
    const newListChecked = checked
      ? [...listChecked, +id]
      : listChecked.filter((item) => +item !== +id);
    if (!checked) this.setState({ isCheckAll: checked });
    else if (newListChecked.length === crypto.data.length)
      this.setState({ isCheckAll: checked });
    this.setState({ listChecked: newListChecked });
  }

  searchDelay(query) {
    const { searchTimeout } = this.state;
    const { cryptoActions } = this.props;
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      cryptoActions.getCryptoLists({ query });
    }, 300);
    this.setState({ searchTimeout: timeout });
  }

  removeCrypto(id = null) {
    this.setState({
      cryptoId: id,
      modal: {
        open: true,
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete?',
        saveButton: {
          color: 'bg-red-800',
          hover: 'hover:bg-red-700',
        },
      },
    });
  }

  removeSingle(id) {
    const { cryptoActions } = this.props;
    cryptoActions.deleteCrypto({ id }).then((data) => {
      if (data.statusCode === 200) {
        cryptoActions.getCryptoLists();
        toast.success('The crypto item was successfully deleted!');
      } else {
        toast.error(data.message);
      }
    });
  }

  removeAll() {
    const { cryptoActions } = this.props;
    const { listChecked } = this.state;
    cryptoActions
      .deleteCryptoMultiple({ ids: listChecked })
      .then((data) => {
        if (data.statusCode === 200) {
          cryptoActions.getCryptoLists();
          toast.success('The crypto item was successfully deleted!');
        } else {
          toast.error(data.message);
        }
      });
  }

  doDelete() {
    const { cryptoId, modal } = this.state;
    cryptoId ? this.removeSingle(cryptoId) : this.removeAll();
    this.setState({ modal: { ...modal, open: false } });
  }

  clickPageAction(page = 1, limit = 10) {
    const { cryptoActions } = this.props;
    cryptoActions.getCryptoLists({ page, limit });
  }

  render() {
    const { notFound, history, crypto, loading } = this.props;
    const { isCheckAll, listChecked, modal, query } = this.state;
    return (
      <>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            {loading.getLists ? <Loading /> : null}
            <div className="flex items-center justify-between pb-4">
              <CryptoSearch
                searchDelay={(query) => this.searchDelay(query)}
              />
              <div className="flex">
                <button
                  disabled={isEmpty(listChecked) ? true : false}
                  onClick={() => this.removeCrypto()}
                  className="disabled:bg-gray-300 disabled:text-gray-400 mr-1 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white inline-flex rounded-md px-3 py-2 text-sm font-medium items-center"
                >
                  <FontAwesomeIcon
                    className="fill-current w-4 h-4 mr-2 disabled"
                    icon={faTrash}
                  />
                  <span>Delete All</span>
                </button>
                <button
                  onClick={() => this.addCrypto()}
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white inline-flex rounded-md px-3 py-2 text-sm font-medium items-center"
                >
                  <FontAwesomeIcon
                    className="fill-current w-4 h-4 mr-2"
                    icon={faAdd}
                  />
                  <span>Add Crypto</span>
                </button>
              </div>
            </div>
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        <input
                          onChange={(e) => this.handleSelectAll(e)}
                          checked={isCheckAll && !isEmpty(crypto)}
                          id="checkbox-all"
                          type="checkbox"
                          className="w-4 h-4 text-gray-800 bg-gray-100 border-gray-300 rounded focus:ring-gray-800 focus:ring-2"
                        />
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      ></th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {!notFound &&
                      crypto?.data?.filter(Boolean).map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="px-6 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                              <input
                                id={item.id}
                                checked={listChecked.includes(
                                  item.id
                                )}
                                onChange={(e) => this.handleSelect(e)}
                                type="checkbox"
                                className="w-4 h-4 text-gray-800 bg-gray-100 border-gray-300 rounded focus:ring-gray-800 focus:ring-2"
                              />
                              <label
                                htmlFor="checkbox"
                                className="sr-only"
                              >
                                Checkbox
                              </label>
                            </td>
                            <td className="px-6 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {item.id}
                            </td>
                            <td className="px-6 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {item.name}
                            </td>
                            <td className="px-6 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                              <span
                                className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-600 text-white"
                              >
                                {item.crypto_type_name}
                              </span>
                            </td>
                            <td className="px-6 py-2 text-green-600 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {`$${item.price.toLocaleString()}`}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() =>
                                  history.push(
                                    `/crypto/edit/${item.id}`
                                  )
                                }
                                className="flex p-2.5 hover:text-gray-600 transition-all duration-300 text-gray-800"
                              >
                                <FontAwesomeIcon
                                  className="h-4 w-4"
                                  icon={faEdit}
                                />
                              </button>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() =>
                                  this.removeCrypto(item.id)
                                }
                                className="flex p-2.5 hover:text-gray-600 transition-all duration-300 text-gray-800"
                              >
                                <FontAwesomeIcon
                                  className="h-4 w-4"
                                  icon={faTrash}
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <Pagination
                itemsPerPage={10}
                pageCount={crypto?.meta?.total_pages}
                items={crypto?.data}
                totalEntries={crypto?.meta?.total_entries}
                clickPageAction={(page, limit) =>
                  this.clickPageAction(page, limit)
                }
              />
            </div>
          </div>
        </div>
        <Modal
          open={modal.open}
          title={modal.title}
          message={modal.message}
          saveButton={modal.saveButton}
          cancelAction={() =>
            this.setState({ modal: { ...modal, open: false } })
          }
          doConfirm={() => this.doDelete()}
        />
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CryptoLists));
