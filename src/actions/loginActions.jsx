import {
  START_LOADING,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  GET_RESET_ERRORS,
  SIGN_OUT_SUCCESSFUL,
  SIGN_UP_SUCCESSFUL,
  SIGN_UP_FAILED,
} from '../contants/constants';
import { loginService } from '../services/loginService';

const loginByEmail = (payload) => async (dispatch, _getState) => {
  try {
    dispatch({
      type: START_LOADING,
      value: { loadingAction: 'login' },
    });
    const data = await loginService.loginByEmail({
      email: payload.email,
      password: payload.password,
    });

    dispatch({
      type: LOGIN_SUCCESSFUL,
      value: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      value: { error: error },
    });
  }
};

const signUpByEmail = (payload) => async (dispatch, _getState) => {
  try {
    dispatch({
      type: START_LOADING,
      value: { loadingAction: 'signUp' },
    });
    const data = await loginService.signUp(payload);

    dispatch({
      type: SIGN_UP_SUCCESSFUL,
      value: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAILED,
      value: { error: error },
    });
  }
};

const logout = (_value) => async (dispatch) => {
  try {
    await loginService.logout();
    dispatch({
      type: SIGN_OUT_SUCCESSFUL,
    });
  } catch (error) {
    console.log(error);
  }
};

const resetErrors = (value) => (dispatch) => {
  dispatch({
    type: GET_RESET_ERRORS,
    value,
  });
};

export { loginByEmail, resetErrors, logout, signUpByEmail };
