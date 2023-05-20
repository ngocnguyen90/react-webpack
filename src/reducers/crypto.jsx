import {
  CRYPTO_LIST,
  DATA,
  HEADER_TITLE,
  SET_HEADER_TITLE,
  SET_SEARCH_DATA,
  SET_CRYPTO_LIST,
  ADD_CRYPTO_LIST,
  EDIT_CRYPTO_LIST
} from '../contants/constants';
import { isEmpty } from 'lodash';

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

const crypto = (state = DATA, action) => {
  let newState = [];
  switch (action.type) {
    case CRYPTO_LIST:
      newState = state;
      break;
    case SET_CRYPTO_LIST:
      newState = action.value;
      break;
    case ADD_CRYPTO_LIST:
      const newCryptoId = isEmpty(state)
        ? 1
        : state.reduce(
            (acc, item) => (acc.id > item.id ? acc.id : item.id),
            0
          ) + 1;
      newState = [...state, { ...action.value, id: newCryptoId }];
      break;
    case EDIT_CRYPTO_LIST:
      newState = state.reduce((acc, item)=> {
        if(item.id === action?.value?.id) acc.push(action.value)
        else acc.push(item)
        return acc
      }, []);
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};

const searchData = (state = [], action) => {
  let newState = [];
  switch (action.type) {
    case SET_SEARCH_DATA:
      newState = action.value;
      break;

    default:
      newState = state;
      break;
  }
  return newState;
};

export { crypto, headerTitle, searchData };
