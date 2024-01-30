import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage/HomePage.tsx';
import PokemonPage from './pages/Pokemon/Pokemon.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokemon/:name" element={<PokemonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
