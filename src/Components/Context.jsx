import React, { useEffect, useState } from 'react';

// 1. Context banaya
const AppContext = React.createContext();

// 2. API URL
const API_URL = `http://www.omdbapi.com/?apikey=bad84fee&s=avengers`;

// 3. Provider component
const AppProvider = ({ children }) => {
  // State for movies and loading
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Movies from API
  useEffect(() => {
    const getMovies = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Data dekhne ke liye

        if (data.Response === "True") {
          setMovies(data.Search); // Movies set kar diye
        } else {
          console.error("No movies found");
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    getMovies(API_URL);
  }, []);

  return (
  // Context.jsx
<AppContext.Provider value={{ movies, isLoading, setMovies, setIsLoading }}>

      {children}
    </AppContext.Provider>
  );
};

// 4. Export
export { AppContext, AppProvider };
