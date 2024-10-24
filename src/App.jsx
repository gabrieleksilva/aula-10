import React, { useState, useEffect } from 'react';

// URL base da API OMDB (você pode usar sua própria chave de API)
const API_URL = 'https://www.omdbapi.com/?apikey=3481d86d';

function App() {
  // State para armazenar filmes, título de busca, estado de carregamento e erro
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar filmes da API OMDB
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

  // useEffect para buscar um filme por padrão ao carregar o componente
  useEffect(() => {
    searchMovies('Matrix'); // Exemplo: busca "Matrix" ao iniciar
  }, []);

  // Função para lidar com a submissão do formulário de pesquisa
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="App">
      <h1>Busca de Filmes</h1>

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
        {movies?.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            {movie.Poster !== 'N/A' ? (
              <img src={movie.Poster} alt={movie.Title} />
            ) : (
              <p>Poster não disponível</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;