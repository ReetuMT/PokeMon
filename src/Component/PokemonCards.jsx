import React, { useEffect, useState } from 'react';
import { getPokemon } from '../services/Pokemon';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

function PokemonCards() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const data = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [id]);

  const chartData = pokemon ? {
    labels: pokemon.stats.map(stat => stat.stat.name),
    datasets: [
      {
        label: `${pokemon.name}'s stats`,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        data: pokemon.stats.map(stat => stat.base_stat),
      },
    ],
  } : {};

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        border: { dash: [6, 6], display: true },
        grid: {
          display: true
        },
        ticks: {
          padding: 15
        }
      },
      x: {
        beginAtZero: true,
        border: { display: true },
        grid: {
          display: false
        },
        ticks: {
          padding: 7
        }
      }
    },
  };

  if (loading) return <div className="loader"></div>;

  return (
    pokemon && (
      <div>
        <h1 style={{ textAlign: 'center' }}>{pokemon.name}</h1>
        <div className="cards-container">
          {/* Pokemon Cards */}
          <div className='card'>
            <div className="sprites">
              {pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt="Front Default" />}
            </div>
            <div className="types" style={{ textAlign: 'center', color: 'white' }}>
              <h3>Height: {pokemon.height}</h3>
              <h3>Weight: {pokemon.weight}</h3>
              <h3>Type:</h3>
              {pokemon.types.map((typeInfo, index) => (
                <button style={{ border: 'none', marginLeft: 10, padding: 10, borderRadius: 10 }} key={index}>
                  {typeInfo.type.name}
                  {index < pokemon.types.length - 1 ? ' ' : ''}
                </button>
              ))}
            </div>
          </div>
          <div className='barcharts' style={{ width: "40%" }}>
            <h1>Stats</h1>
            <Bar data={chartData} options={options} />
          </div>
        </div>
        <div>
          <h3 style={{ textAlign: 'center', textDecoration: 'underline', fontSize: 19, fontFamily: 'sans-serif' }}>IMAGES</h3>
          <div className='img_list'>
            {pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt="Front Default" />}
            {pokemon.sprites.back_default && <img src={pokemon.sprites.back_default} alt="Back Default" />}
            {pokemon.sprites.back_shiny && <img src={pokemon.sprites.back_shiny} alt="Back Shiny Default" />}
            {pokemon.sprites.back_shiny_female && <img src={pokemon.sprites.back_shiny_female} alt="Back Shiny Female" />}
            {pokemon.sprites.front_female && <img src={pokemon.sprites.front_female} alt="Front Female" />}
            {pokemon.sprites.front_shiny && <img src={pokemon.sprites.front_shiny} alt="Front Shiny" />}
            {pokemon.sprites.front_shiny_female && <img src={pokemon.sprites.front_shiny_female} alt="Front Shiny Female" />}
          </div>
        </div>
      </div>
    )
  );
}

export default PokemonCards;
