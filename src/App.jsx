
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar'
import PokemonCards from './Component/PokemonCards'
import Mains from './Mains'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/PokeMon" element={<Mains />} />
          <Route path="/pokemon/:id" element={<PokemonCards />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
