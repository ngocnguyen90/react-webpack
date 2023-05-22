import axios from 'axios';
import BaseService from './baseService';
import { SIGN_OUT_SUCCESSFUL } from '../contants/constants';
import { toast } from 'react-hot-toast';

const CancelToken = axios.CancelToken;

//	add interceptors for axios request/response to handle jwt
export const axiosInterceptor = {
  setupInterceptors: (history) => {
    axios.interceptors.request.use(
      async (config) => {
        //	for public APIs and APIs involving `auth`, no need to include access token
        if (
          ['public/', 'auth/'].some(
            (key) => config.url && config.url.indexOf(key) > -1
          )
        ) {
          return config;
        }

        const timeNow = new Date().getTime() / 1000;

        const accessTokenExpiry = localStorage.getItem(
          'ACCESS_TOKEN_EXPIRY'
        );

        // refresh access token 2 minutes before token is expired
        if (
          accessTokenExpiry &&
          accessTokenExpiry - 2 * 60 < timeNow
        ) {
          if (
            config.url !== `${BaseService.getHostUrl()}/users/refresh`
          ) {
            try {
              const data = await getNewJwt();
              const token = data && data['access_token'];
              config.headers['Authorization'] = `Bearer ${token}`;
            } catch (error) {
              clearJwtData();
              window.bookingReduxStore.dispatch({
                type: SIGN_OUT_SUCCESSFUL,
              });
              history.push('/login');
              toast.error('Sorry, your token expired');
            }
          }
          return config;
        } else if (accessTokenExpiry && accessTokenExpiry < timeNow) {
          //	cancel the request
          clearJwtData();
          window.bookingReduxStore.dispatch({
            type: SIGN_OUT_SUCCESSFUL,
          });
          history.push('/login');
          toast.error('Sorry, your token expired');
          return {
            ...config,
            cancelToken: new CancelToken((cancel) =>
              cancel('Cancel request due to expired session')
            ),
          };
        }
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        if (accessToken) {
          config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
};

const getNewJwt = () => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const options = accessToken
    ? { authorization: 'Bearer ' + accessToken }
    : null;

  return new Promise((resolve, reject) => {
    axios
      .post(
        `${BaseService.getHostUrl()}/users/refresh`,
        {
          refresh_token: localStorage.getItem('REFRESH_TOKEN'),
        },
        authService.createAuthRequestConfig(options)
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          //	process and store JWT data in localStorage
          storeJwtData(res.data);
          resolve(res.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const storeJwtData = (jwtData) => {
  if (!jwtData) return;
  const accessToken = jwtData['access_token'] || null;
  const refreshToken = jwtData['refresh_token'] || null;
  const exp = jwtData['exp'] || null;

  localStorage.setItem('ACCESS_TOKEN', accessToken);
  localStorage.setItem('ACCESS_TOKEN_EXPIRY', exp);
  localStorage.setItem('REFRESH_TOKEN', refreshToken);
};

export const clearJwtData = () => {
  localStorage.setItem('ACCESS_TOKEN', '');
  localStorage.setItem('ACCESS_TOKEN_EXPIRY', '');
  localStorage.setItem('REFRESH_TOKEN', '');
};

class AuthService extends BaseService {
  get = (url, params, options) => {
    return axios.get(url, {
      params,
      ...this.createAuthRequestConfig(options),
    });
  };
  post = (url, body, options) => {
    return axios.post(
      url,
      body,
      this.createAuthRequestConfig(options)
    );
  };
  put = (url, body, options) => {
    return axios.put(
      url,
      body,
      this.createAuthRequestConfig(options)
    );
  };
  delete = (url, options) => {
    return axios.delete(url, this.createAuthRequestConfig(options));
  };

  createAuthRequestConfig = (options) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    };

    if (options) {
      const { authorization } = options;
      if (authorization) {
        headers['Authorization'] = authorization;
      }
    }
    return {
      headers,
      cancelToken: options?.axiosCancelToken,
    };
  };
}

export const authService = new AuthService();
