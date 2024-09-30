"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        console.log(data); // Log the full response
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
  
    fetchTrendingMovies();
  }, []);
  

  return (
    <div>
      <h1>Trending Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
