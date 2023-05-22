import {
  HEADER_TITLE,
  SET_HEADER_TITLE,
  GET_CRYPTOS_SUCCESSFUL,
  GET_CRYPTOS_FAILED,
  START_LOADING,
  GET_CRYPTO_TYPES_SUCCESSFUL,
  ADD_CRYPTO_FAILED,
  GET_RESET_ERRORS,
  ADD_CRYPTO_SUCCESSFUL,
  EDIT_CRYPTO_SUCCESSFUL,
  EDIT_CRYPTO_FAILED,
  DELETE_CRYPTO_SUCCESSFUL,
  DELETE_CRYPTO_MULTIPLE_SUCCESSFUL,
} from '../contants/constants';

const defaultState = {
  cryptoLists: [],
  cryptoTypes: [],
  loading: {
    getLists: false,
    getCryptoTypes: false,
    addCrypto: false,
    editCrypto: false,
    getCryptoDetail: false,
    deleteCrypto: false,
    deleteMultipleCrypto: false,
  },
  error: {
    failed: false,
    message: null,
  },
};

const headerTitle = (state = '', action) => {
  let newState = [];
  switch (action.type) {
    case HEADER_TITLE:
      newState = state;
      break;
    case SET_HEADER_TITLE:
      newState = action.value;
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};

const crypto = (state = defaultState, action) => {
  let newState = [];
  switch (action.type) {
    case GET_CRYPTOS_SUCCESSFUL:
      newState = {
        ...state,
        cryptoLists: action.value,
        loading: { ...state.loading, getLists: false },
      };
      break;
    case GET_CRYPTOS_FAILED:
      const {
        error: { statusCode },
      } = action.value;

      newState = {
        ...state,
        loading: { ...state.loading, getLists: false },
        error: {
          statusCode,
          failed: true,
          message:
            action?.value.error?.message ||
            'Something Went Wrong. Please try again.',
        },
      };
      break;
    case START_LOADING:
      newState = {
        ...state,
        loading: {
          ...state.loading,
          [action.value.loadingAction]: true,
        },
      };
      break;
    case GET_CRYPTO_TYPES_SUCCESSFUL:
      newState = {
        ...state,
        cryptoTypes: action.value,
        loading: { ...state.loading, getCryptoTypes: false },
      };
      break;
    case ADD_CRYPTO_SUCCESSFUL:
      newState = {
        ...state,
        loading: { ...state.loading, addCrypto: false },
      };
      break;
    case ADD_CRYPTO_FAILED:
      newState = {
        ...state,
        loading: { ...state.loading, addCrypto: false },
        error: {
          statusCode: 400,
          failed: true,
          errors: action?.value.error?.errors,
          message: action?.value.error?.message,
        },
      };
      break;
    case EDIT_CRYPTO_SUCCESSFUL:
      newState = {
        ...state,
        loading: { ...state.loading, addCrypto: false },
      };
      break;
    case EDIT_CRYPTO_FAILED:
      newState = {
        ...state,
        loading: { ...state.loading, editCrypto: false },
        error: {
          statusCode: 400,
          failed: true,
          errors: action?.value.error?.errors,
          message: action?.value.error?.message,
        },
      };
      break;
    case DELETE_CRYPTO_SUCCESSFUL:
      newState = {
        ...state,
        loading: { ...state.loading, deleteCrypto: false },
      };
      break;
    case DELETE_CRYPTO_MULTIPLE_SUCCESSFUL:
      newState = {
        ...state,
        loading: { ...state.loading, deleteMultipleCrypto: false },
      };
      break;
    case GET_RESET_ERRORS:
      newState = {
        ...state,
        error: { ...defaultState.error },
      };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};

export { crypto, headerTitle };
