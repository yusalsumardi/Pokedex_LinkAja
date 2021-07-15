import './App.css';
import RouterContent from './component/router';
import { Router } from 'react-router';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <RouterContent />
    </Router>
  );
}

export default App;
