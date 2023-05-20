import { combineReducers } from 'redux';
import { crypto, headerTitle, searchData} from './crypto';

const reducer = combineReducers({
  crypto,
  headerTitle,
  searchData
});

export default reducer;
