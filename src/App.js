import {
  BrowserRouter as Router
}
from 'react-router-dom';

import SupportChat from './components/SupportChat.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <SupportChat />
      </Router>
    </div>
  );
}

export default App;
