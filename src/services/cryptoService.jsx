import BaseService from './baseService';
import { authService } from './authService';

class CryptoService extends BaseService {
  constructor({ authService }) {
    super();
    this.authService = authService;
  }

  getCryptos = (payload) => {
    payload = {
      ...payload,
      limit: 10,
    };
    return this.authService
      .get(this.getApiUrl('cryptos'), payload)
      .then((response) => {
        return this.extractData(response);
      })
      .catch((error) => this.handleError(error));
  };

  getCryptoDetail = (payload) => {
    return this.authService
      .get(this.getApiUrl(`cryptos/${payload.id}`))
      .then((response) => {
        return this.extractData(response);
      })
      .catch((error) => this.handleError(error));
  };

  getCryptoTypes = (payload) => {
    return this.authService
      .get(this.getApiUrl('crypto_types'), payload)
      .then((response) => {
        return this.extractData(response);
      })
      .catch((error) => this.handleError(error));
  };

  addCrypto = (payload) => {
    return this.authService
      .post(this.getApiUrl('cryptos'), JSON.stringify(payload))
      .then((response) => {
        return this.extractData(response);
      })
      .catch((error) => this.handleError(error));
  };

  editCrypto = (id, payload) => {
    return this.authService
      .put(this.getApiUrl(`cryptos/${id}`), JSON.stringify(payload))
      .then((response) => {
        return this.extractData(response);
      })
      .catch((error) => this.handleError(error));
  };

  deleteCrypto = (id, payload) => {
    return this.authService
      .delete(this.getApiUrl(`cryptos/${id}`))
      .then((response) => {
        return this.extractData(response);
      })
      .catch((error) => this.handleError(error));
  };

  deleteCryptoMultiple = (payload) => {
    return this.authService
      .delete(this.getApiUrl('cryptos/delete/multiple'), payload)
      .then((response) => {
        return this.extractData(response);
      })
      .catch((error) => this.handleError(error));
  };
}

export const cryptoService = new CryptoService({ authService });
