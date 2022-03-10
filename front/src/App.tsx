import NavBar from './Components/NavBar';
import RandomWord from './Components/RandomWord';
import SearchWord from './Components/SearchWord';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';

// use can chose to run the app - local / AWS stack
export const BASE_URL = 'http://localhost:3000';
// export const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="header">
          <NavBar />
          Dictionary
        </h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/word/" element={<SearchWord />} />
          <Route path="/part-of-speech/" element={<RandomWord />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
