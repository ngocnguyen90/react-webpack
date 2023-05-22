import { combineReducers } from 'redux';
import { crypto, headerTitle } from './crypto';
import { loginInfor } from './login';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const loginPersistConfig = {
  key: 'loginInfor',
  storage,
  whitelist: ['accountInfor'],
};

const reducer = combineReducers({
  crypto,
  headerTitle,
  loginInfor: persistReducer(loginPersistConfig, loginInfor),
});

export default reducer;
