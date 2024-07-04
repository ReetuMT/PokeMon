
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mains from './Mains';
import PokemonCards from './Component/PokemonCards';
import Navbar from './Component/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Mains />} />
        <Route path="/pokemon/:id" element={<PokemonCards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
