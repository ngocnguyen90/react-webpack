import {
  CRYPTO_LIST,
  SET_HEADER_TITLE,
  SET_SEARCH_DATA,
  SET_CRYPTO_LIST,
  ADD_CRYPTO_LIST,
  EDIT_CRYPTO_LIST,
} from '../contants/constants';

const cryptoLists = (value) => (dispatch) => {
  dispatch({
    type: CRYPTO_LIST,
    value,
  });
};

const setCryptoLists = (value) => (dispatch) => {
  dispatch({
    type: SET_CRYPTO_LIST,
    value,
  });
};

const addCrypto = (value) => (dispatch) => {
  dispatch({
    type: ADD_CRYPTO_LIST,
    value,
  });
};

const editCrypto = (value) => (dispatch) => {
  dispatch({
    type: EDIT_CRYPTO_LIST,
    value,
  });
};

const setHeaderTitle = (value) => (dispatch) => {
  dispatch({
    type: SET_HEADER_TITLE,
    value,
  });
};

const setSearchData = (value) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_DATA,
    value,
  });
};

export {
  cryptoLists,
  setHeaderTitle,
  setSearchData,
  setCryptoLists,
  addCrypto,
  editCrypto,
};
