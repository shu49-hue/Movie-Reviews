import { useState, useEffect } from 'react';
import './app.css';
import Search from './components/search';
import useDebounce from './useDebounce';


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const debouncedSearch = useDebounce(showSearch, 600);


const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [showSearch, setShowSearch] = useState('');
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query = '') => {
  if (query && query.trim().length < 2) return;
    setLoading(true);
    setError(null); 
    
    try {
      const endpoint = query
        ? `/search/movie?query=${encodeURIComponent(query)}`
        : `/movie/popular`;

      const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        API_OPTIONS
      );

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchMovies(debouncedSearch);
}, [debouncedSearch]);


  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero">
        <img src="/hero.png" alt="Hero posters" className="hero-image" />

        <h1>
          Find <span className="text-gradient">Movies</span> You’ll Enjoy
          <br />
          Without the Hassle
        </h1>

        <Search
          showSearch={showSearch}
          setShowSearch={setShowSearch}
        />
      </section>

      {/* MOVIES SECTION */}
      <section className="movies-section">
        <h2>All Movies</h2>

        {loading && <p className="loading-message">Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : '/No-Poster.png'
                }
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>⭐ {movie.vote_average}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default App;
