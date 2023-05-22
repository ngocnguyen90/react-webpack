import './App.css';
import './index.scss'
import Main from './containers/main';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {axiosInterceptor} from './services/authService'

const history = createBrowserHistory();
axiosInterceptor.setupInterceptors(history);

function App() {
  return (
    <div>
      <Router history={history}>
        <Route path='/' component={Main} />
      </Router>
    </div>
  );
}

export default App;
