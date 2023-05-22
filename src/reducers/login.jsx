import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  START_LOADING,
  GET_RESET_ERRORS,
  SIGN_OUT_SUCCESSFUL,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESSFUL,
} from '../contants/constants';
import { clearJwtData } from '../services/authService';

const defaultState = {
  accountInfor: {
    access_token: null,
    refresh_token: null,
    exp: null,
    email: null,
    id: null,
  },
  loading: {
    login: false,
    signUp: false,
  },
  error: {
    failed: false,
    message: null,
  },
};

const loginInfor = (state = defaultState, action) => {
  let newState = {};
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      newState = {
        ...state,
        accountInfor: action.value,
        loading: { ...state.loading, login: false },
      };
      break;

    case LOGIN_FAILED:
      const {
        error: { statusCode },
      } = action.value;

      let msg = '';
      if (statusCode === 429) {
        msg =
          'You have exceeded the maximum number of attempts. Please try after some time.';
      }

      newState = {
        ...state,
        loading: { ...state.loading, login: false },
        error: {
          statusCode,
          failed: true,
          message:
            msg ||
            'Log in details are not correct. Please try again.',
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
    case GET_RESET_ERRORS:
      newState = {
        ...state,
        error: { ...defaultState.error },
      };
      break;
    case SIGN_OUT_SUCCESSFUL:
      clearJwtData();
      newState = defaultState;
      break;

    case SIGN_UP_SUCCESSFUL:
      newState = {
        ...state,
        loading: { ...state.loading, signUp: false },
      };
      break;
    case SIGN_UP_FAILED:
      newState = {
        ...state,
        loading: { ...state.loading, signUp: false },
        error: {
          statusCode: 400,
          failed: true,
          errors: action?.value.error?.errors,
          message: action?.value.error?.message,
        },
      };
      break;

    default:
      newState = state;
      break;
  }
  return newState;
};

export { loginInfor };
