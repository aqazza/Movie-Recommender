"use client";

import { useEffect, useState } from 'react';

// Define the movie interface to include backdrop_path
interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  [key: string]: any;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [preferences, setPreferences] = useState('');
  const [recommendations, setRecommendations] = useState('');

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          .filter((movie) => movie.id && movie.title)
          .map((movie) => (
            <li key={movie.id} style={{ listStyleType: 'none', marginBottom: '20px' }}>
              {/* Backdrop Image */}
              <div
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                  height: '300px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '10px',
                }}
              >
                {/* Movie Title Overlay */}
                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                  }}
                >
                  <h3>{movie.title}</h3>
                </div>
              </div>
            </li>
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
