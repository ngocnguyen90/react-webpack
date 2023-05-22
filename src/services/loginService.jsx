import BaseService from './baseService';
import { parseString, parseNumber } from '../utils/parsers';
import { storeJwtData, authService } from './authService';

class LoginService extends BaseService {
  constructor({ authService }) {
    super();
    this.authService = authService;
  }

  loginByEmail = ({ email, password }) => {
    return this.authService
      .post(
        this.getApiUrl('users/login'),
        JSON.stringify({ email, password })
      )
      .then((response) => {
        return this._transformLoginByEmailData(
          this.extractData(response)
        );
      })
      .catch((error) => this.handleError(error));
  };

  signUp = (payload) => {
    return this.authService
      .post(this.getApiUrl('users/register'), JSON.stringify(payload))
      .then((response) => {
        return this.extractData(response);
      })
      .catch((error) => this.handleError(error));
  };

  logout = () => {
    return this.authService
      .get(this.getApiUrl('users/logout'))
      .then((response) => {
        return this.extractData(response);
      })
      .catch((error) => this.handleError(error));
  };

  _transformLoginByEmailData = (data) => {
    if (!data) {
      return null;
    }

    //  store jwt data to localStorage
    storeJwtData(data);

    return {
      userId: parseString(data['user_id']),
      email: parseString(data['email']),
      accessToken: parseString(data['access_token']),
      refreshToken: parseString(data['refresh_token']),
      exp: parseNumber(data['exp']),
    };
  };
}

export const loginService = new LoginService({ authService });
