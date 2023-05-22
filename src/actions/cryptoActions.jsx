import {
  SET_HEADER_TITLE,
  START_LOADING,
  GET_CRYPTOS_SUCCESSFUL,
  GET_CRYPTOS_FAILED,
  GET_CRYPTO_TYPES_SUCCESSFUL,
  ADD_CRYPTO_SUCCESSFUL,
  ADD_CRYPTO_FAILED,
  GET_RESET_ERRORS,
  GET_CRYPTOS_DETAIL_SUCCESSFUL,
  EDIT_CRYPTO_SUCCESSFUL,
  EDIT_CRYPTO_FAILED,
  DELETE_CRYPTO_SUCCESSFUL,
  DELETE_CRYPTO_MULTIPLE_SUCCESSFUL,
} from '../contants/constants';
import { cryptoService } from '../services/cryptoService';

const getCryptoLists = (value) => async (dispatch, _getState) => {
  try {
    dispatch({
      type: START_LOADING,
      value: { loadingAction: 'getLists' },
    });
    const data = await cryptoService.getCryptos(value);
    dispatch({
      type: GET_CRYPTOS_SUCCESSFUL,
      value: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: GET_CRYPTOS_FAILED,
      value: { error: error },
    });
  }
};

const getCryptoTypes = (value) => async (dispatch, _getState) => {
  try {
    dispatch({
      type: START_LOADING,
      value: { loadingAction: 'getCryptoTypes' },
    });
    const data = await cryptoService.getCryptoTypes(value);
    dispatch({
      type: GET_CRYPTO_TYPES_SUCCESSFUL,
      value: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCryptoDetail = (payload) => async (dispatch, _getState) => {
  try {
    dispatch({
      type: START_LOADING,
      value: { loadingAction: 'getCryptoDetail' },
    });
    const data = await cryptoService.getCryptoDetail(payload);
    dispatch({
      type: GET_CRYPTOS_DETAIL_SUCCESSFUL,
      value: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: GET_CRYPTOS_FAILED,
      value: { error: error },
    });
  }
};

const addCrypto = (payload) => async (dispatch, _getState) => {
  try {
    dispatch({
      type: START_LOADING,
      value: { loadingAction: 'addCrypto' },
    });
    const data = await cryptoService.addCrypto(payload);

    dispatch({
      type: ADD_CRYPTO_SUCCESSFUL,
      value: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: ADD_CRYPTO_FAILED,
      value: { error: error },
    });
  }
};

const editCrypto = (payload) => async (dispatch, _getState) => {
  try {
    dispatch({
      type: START_LOADING,
      value: { loadingAction: 'editCrypto' },
    });
    const data = await cryptoService.editCrypto(payload.id, payload);

    dispatch({
      type: EDIT_CRYPTO_SUCCESSFUL,
      value: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: EDIT_CRYPTO_FAILED,
      value: { error: error },
    });
  }
};

const deleteCrypto = (payload) => async (dispatch, _getState) => {
  try {
    dispatch({
      type: START_LOADING,
      value: { loadingAction: 'deleteCrypto' },
    });
    const data = await cryptoService.deleteCrypto(payload.id);

    dispatch({
      type: DELETE_CRYPTO_SUCCESSFUL,
      value: data,
    });
    return data;
  } catch (error) {
    return error;
  }
};

const deleteCryptoMultiple =
  (payload) => async (dispatch, _getState) => {
    try {
      dispatch({
        type: START_LOADING,
        value: { loadingAction: 'deleteCryptoMultiple' },
      });
      const data = await cryptoService.deleteCryptoMultiple(payload);

      dispatch({
        type: DELETE_CRYPTO_MULTIPLE_SUCCESSFUL,
        value: data,
      });
      return data;
    } catch (error) {
      return error;
    }
  };

const setHeaderTitle = (value) => (dispatch) => {
  dispatch({
    type: SET_HEADER_TITLE,
    value,
  });
};

const resetErrors = (value) => (dispatch) => {
  dispatch({
    type: GET_RESET_ERRORS,
    value,
  });
};

export {
  getCryptoLists,
  getCryptoTypes,
  setHeaderTitle,
  getCryptoDetail,
  addCrypto,
  editCrypto,
  deleteCrypto,
  deleteCryptoMultiple,
  resetErrors,
};
