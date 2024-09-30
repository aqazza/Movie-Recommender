"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [preferences, setPreferences] = useState(''); // State to store user preferences
  const [recommendations, setRecommendations] = useState(''); // State to store AI recommendations

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent form reload
  
      // Call OpenAI API for recommendations
      const openAiResponse = await fetch('/api/get-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences }),
      });
      
      const result = await openAiResponse.json();
      setRecommendations(result.recommendations);
    };

  return (
    <div>
      <h1>Trending Movies</h1>
      <ul>
        {movies
          .filter(movie => movie.id && movie.title)
          .map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
      </ul>

      {/* Input Form for Preferences */}
      <form onSubmit={handleSubmit}>
        <h2>Enter your movie preferences</h2>
        <textarea
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="e.g., I like action movies, comedies, or movies like Inception."
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit">Get Recommendations</button>
      </form>

      {/* Display AI Recommendations */}
      {recommendations && (
        <div>
          <h2>AI Movie Recommendations</h2>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
}
