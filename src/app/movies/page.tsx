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
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [preferences, setPreferences] = useState("");
  const [recommendations, setRecommendations] = useState("");

  // Scroll to top on page load or navigation
  useEffect(() => {
    window.scrollTo(0, 0); // Ensure the page scrolls to the top when accessed

    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        setTopRatedMovies(data.results);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    fetchTrendingMovies();
    fetchTopRatedMovies();
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
      {/* Trending Movies Section */}
      <div className="movie-container">
        <h1>Trending Movies</h1>
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
          {trendingMovies
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

      {/* Top Rated Movies Section */}
      <div className="movie-container">
        <h1>Top Rated Movies</h1>
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
          {topRatedMovies
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
