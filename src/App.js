import './App.css';
import Main from './containers/main';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path='/' component={Main} />
      </BrowserRouter>
    </div>
  );
}

export default App;
