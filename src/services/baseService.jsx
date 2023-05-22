import { API_HOST } from '../contants/constants';

export default class BaseService {
  static getHostUrl() {
    return `${API_HOST}/api/v1`;
  }

  getApiUrl(url) {
    return `${API_HOST}/api/v1/${url}`;
  }

  extractData(response) {
    return response && response['data'] ? response['data'] : response;
  }

  parseJwt(jwt) {
    if (!jwt) return null;
    return JSON.parse(atob(jwt.split('.')[1]));
  }

  handleError = (error) => {
    const { response } = error;
    const errorObj = {
      statusCode: response?.status ? response?.status : null,
      message: null,
      statusText: response?.statusText ? response?.statusText : null,
      errors: [],
    };

    if (response?.['data']) {
      const { data } = response;
      if (data['message'] || data['error']) {
        errorObj.message = data['message'] || data['error'];
      } else if (typeof data === 'object' && data !== null) {
        const _data = data;
        if (Array.isArray(_data) && _data.length > 0) {
          const _errorMessages = Object.keys(_data[0]).map(
            (key) => _data[0][key][0]
          );
          errorObj.message =
            _errorMessages && _errorMessages.length > 0
              ? _errorMessages[0]
              : '';
        } else {
          errorObj.errors = Object.keys(_data).reduce((acc, key) => {
            acc.push({ key: key, message: _data?.[key]?.[0] });
            return acc;
          }, []);
        }
      }
    }
    throw errorObj;
  };
}
