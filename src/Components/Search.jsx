import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './Context';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Search = () => {
  const { setMovies, setIsLoading } = useContext(AppContext);
  const [query, setQuery] = useState('');

  const API_URL = `https://www.omdbapi.com/?apikey=bad84fee&s=`;

  const searchMovie = async () => {
    if (query.trim() === '') return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}${query}`);
      const data = await res.json();
      console.log(data);

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error searching movie:', error);
      setIsLoading(false);
    }
  };

  // Auto search after 0.5 seconds of typing
  useEffect(() => {
    const timer = setTimeout(() => {
      searchMovie();
    }, 700);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control form-control-lg rounded-start"
              placeholder="Search your favorite movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                backgroundColor: '#f8f9fa', // Light background
                border: '2px solid #ced4da', // Subtle border color
              }}
            />
            <button
              className="btn btn-primary btn-lg rounded-end"
              type="button"
              onClick={searchMovie}
              style={{
                backgroundColor: '#007bff', // Blue color for the button
                border: 'none',
              }}
            >
              <i className="bi bi-search" style={{ fontSize: '18px' }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
