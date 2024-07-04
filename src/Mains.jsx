import React, { useEffect, useState } from 'react';
import { getAllPokeMan, getPokemon } from './services/Pokemon';
import { Link, NavLink } from 'react-router-dom';

function Mains() {
  const [data, setData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=20";

  useEffect(() => {
    fetchData(initialUrl);
  }, []);

  async function fetchData(url) {
    setLoading(true);
    try {
      let response = await getAllPokeMan(url);
      if (response && response.results) {
        await loadPokemon(response.results);
        setNextUrl(response.next);
        setPrevUrl(response.previous);
      } else {
        console.error('Invalid response structure', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    try {
      let pokemon = await Promise.all(
        data.map(async (pokemon) => {
          let pokemonCard = await getPokemon(pokemon.url);
          return pokemonCard;
        })
      );
      setData(pokemon);
    } catch (error) {
      console.error('Error loading Pokemon:', error);
    }
  };

  const handleNext = async () => {
    if (nextUrl) {
      await fetchData(nextUrl);
    }
  };

  const handlePrev = async () => {
    if (prevUrl) {
      await fetchData(prevUrl);
    }
  };

  return (
    <>
      {loading ? (
        <div className='loader'></div>
      ) : (
        <>
          <div className="cards">
            {data.map((pokemon, index) => (
              <div className="carding" key={index}>
                <NavLink to={`/pokemon/${pokemon.id}`}>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </NavLink>
                
                  <h2>{pokemon.name}</h2>
                
              </div>
            ))}
          </div>
          <div className='buttons'>
            <button className="btn btn-secondary" onClick={handlePrev} disabled={!prevUrl}>
              Back
            </button>
            <button className="btn btn-dark" onClick={handleNext} disabled={!nextUrl}>
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Mains;
