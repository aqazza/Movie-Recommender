"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Mousewheel } from 'swiper/modules';  // Import modules correctly in Swiper v11
import 'swiper/css';  // Main Swiper styles
import 'swiper/css/scrollbar';  // Scrollbar styles
import 'swiper/css/mousewheel';  // Mousewheel styles

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [preferences, setPreferences] = useState("");
  const [recommendations, setRecommendations] = useState("");

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const openAiResponse = await fetch("/api/get-recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ preferences }),
    });

    const result = await openAiResponse.json();
    setRecommendations(result.recommendations);
  };

  return (
    <div>
      {/* Movie Container */}
      <div className="movie-container">
        <h1>Trending Movies</h1> {/* Moved here for proper structure */}
        <Swiper
          grabCursor={true}
          speed={400}
          modules={[Scrollbar, Mousewheel]}  // Add modules here in Swiper v11
          mousewheel={{ invert: false }}
          scrollbar={{ draggable: true }}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            900: { slidesPerView: 2, spaceBetween: 20 },
            1200: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {movies
            .filter((movie) => movie.id && movie.title)
            .map((movie) => (
              <SwiperSlide key={movie.id}>
                <div className="card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    className="post-img"
                  />
                  <div className="info">
                    <h1>{movie.title}</h1>
                    <p>{movie.overview.substring(0, 100)}...</p>
                    <button>Read More</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

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

      {recommendations && (
        <div>
          <h2>AI Movie Recommendations</h2>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
}
