// components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://www.omdbapi.com/?apikey=3481d86d';

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async (title) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError('Nenhum filme encontrado');
      }
    } catch (err) {
      setError('Erro ao buscar filmes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchMovies(searchTerm);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o título do filme"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <Link to={`/movie/${movie.imdbID}`}>
              <h2>
                {movie.Title} ({movie.Year})
              </h2>
              {movie.Poster !== 'N/A' ? (
                <img src={movie.Poster} alt={`${movie.Title} Poster`} />
              ) : (
                <p>Poster não disponível</p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
