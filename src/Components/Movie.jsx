import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trailerId, setTrailerId] = useState(null);

  const API_URL = `https://www.omdbapi.com/?apikey=bad84fee&i=${id}`;
  const YOUTUBE_API_KEY = 'AIzaSyDbieZ7sbH6SdahFxB2fYrLyY9ioxEUWMo';

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


  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.Response === 'True') {
          setMovie(data);
          fetchTrailer(data.Title);
        } else {
          setMovie(null);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const fetchTrailer = async (title) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(title + " official trailer")}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video`
      );
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        setTrailerId(data.items[0].id.videoId);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center my-5">
        <h2 className="text-danger">Movie not found</h2>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Movie Top Section */}
      <div className="row g-4 align-items-center">
        {/* Poster */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <img
              src={movie.Poster === 'N/A' ? 'https://via.placeholder.com/300x400.png?text=No+Image' : movie.Poster}
              className="img-fluid rounded"
              alt={movie.Title}
              style={{ objectFit: 'cover', height: '100%' }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="col-md-8">
          <h1 className="fw-bold">{movie.Title}</h1>
          <p className="text-muted">{movie.Year} | {movie.Genre} | {movie.Runtime}</p>

          <div className="mb-4">
            <h5 className="fw-semibold">Plot Summary</h5>
            <p>{movie.Plot || 'No description available.'}</p>
          </div>

          <div className="row">
            <div className="col-md-6">
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Writer:</strong> {movie.Writer}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Released:</strong> {movie.Released}</p>
              <p><strong>Language:</strong> {movie.Language}</p>
              <p><strong>Country:</strong> {movie.Country}</p>
            </div>
          </div>

          <div className="mt-4 d-flex flex-wrap gap-2">
            <a href={movie.Website !== 'N/A' ? movie.Website : '#'} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visit Website
            </a>
            <span className="badge bg-success p-2">{movie.Awards}</span>
            <span className="badge bg-warning text-dark p-2">IMDB Rating: {movie.imdbRating}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-5" />

      {/* Trailer Section */}
      {trailerId && (
        <div>
          <h3 className="fw-bold mb-4">Watch Trailer</h3>
          <div className="ratio ratio-16x9 rounded shadow">
            <iframe
              src={`https://www.youtube.com/embed/${trailerId}`}
              title="Movie Trailer"
              allowFullScreen
              className="rounded"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
