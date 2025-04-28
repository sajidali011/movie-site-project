import React, { useContext, useEffect } from 'react';
import { AppContext } from './Context';
import Search from './Search';
import { Link } from 'react-router-dom'; // 👈 Link use karenge direct page change ke liye

const Home = () => {
  const { movies, isLoading } = useContext(AppContext);

// 🖌️ Set body background color jab Home component render ho
useEffect(() => {
  document.body.style.backgroundImage = 'linear-gradient(to right, #33ccff, #ff99cc)'; 
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.backgroundSize = 'cover';

  // Cleanup: Jab component chhodega toh background reset karna
  return () => {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = '';
  };
}, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Search Bar */}
      <div className="mb-5">
        <Search />
      </div>

      {/* Movies Grid */}
      <div className="row g-4">
        {movies.map((movie) => (
          <div className="col-md-3 col-sm-6" key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`} className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm border-0 rounded hover-shadow" style={{ transition: 'transform 0.3s ease' }}>
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x400.png?text=No+Image'}
                  className="card-img-top rounded-top"
                  alt={movie.Title}
                  style={{ height: '350px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{movie.Title}</h5>
                  <p className="card-text text-muted">Year: {movie.Year}</p>
                  <div className="mt-auto">
                    <button className="btn btn-outline-primary w-100">View Details</button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
