"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  // Import useRouter
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Mousewheel } from 'swiper/modules';
import { FaFistRaised, FaSpaceShuttle, FaLaugh, FaExclamationTriangle, FaShieldAlt, FaSkull, FaHeart, FaFilm, FaMusic, FaChild, FaDragon, FaTheaterMasks, FaLandmark, FaMagic, FaRocket, FaPlane, FaHorse, FaQuestionCircle, FaTv, FaKissWinkHeart } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/mousewheel';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
}

interface TVShow {
  id: number;
  name: string;
  backdrop_path: string;
  overview: string;
}

interface Genre {
  id: number;
  name: string;
}

export default function Home() {
  const router = useRouter(); // Initialize useRouter
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState<TVShow[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [discoverMovies, setDiscoverMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
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

    const fetchTopRatedTVShows = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        setTopRatedTVShows(data.results);
      } catch (error) {
        console.error("Error fetching top-rated TV shows:", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchTrendingMovies();
    fetchTopRatedMovies();
    fetchTopRatedTVShows();
    fetchGenres();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchQuery}`
      );
      const data = await response.json();
      setDiscoverMovies(data.results);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  const handleDiscoverByGenre = async (genreId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}`
      );
      const data = await response.json();
      setDiscoverMovies(data.results);
    } catch (error) {
      console.error("Error discovering movies by genre:", error);
    }
  };

  // Function to navigate to TMDb page
  const handleReadMore = (movieId: number) => {
    const tmdbUrl = `https://www.themoviedb.org/movie/${movieId}`;
    window.open(tmdbUrl, '_blank'); // Open the TMDb page in a new tab
  };

  const handleReadMoreTVShow = (showId: number) => {
    const tmdbUrl = `https://www.themoviedb.org/tv/${showId}`;
    window.open(tmdbUrl, '_blank'); // Open the TMDb page for TV shows in a new tab
  };

  // Mapping of genre IDs to corresponding icons
// Mapping of genre IDs to corresponding icons (all unique, no repeats)
const genreIcons: { [key: number]: JSX.Element } = {
  28: <FaFistRaised />,        // Action
  12: <FaPlane />,             // Adventure
  16: <FaDragon />,            // Animation
  35: <FaLaugh />,             // Comedy
  80: <FaTheaterMasks />,      // Crime
  99: <FaFilm />,              // Documentary
  18: <FaHeart />,             // Drama
  10751: <FaChild />,          // Family (Changed to FaChild)
  14: <FaMagic />,             // Fantasy (Changed to FaMagic)
  36: <FaLandmark />,          // History (Changed to FaLandmark)
  27: <FaSkull />,             // Horror
  10402: <FaMusic />,          // Music
  9648: <FaQuestionCircle />,  // Mystery (Changed to FaQuestionCircle)
  10749: <FaKissWinkHeart />,  // Romance (Changed to FaKissWinkHeart)
  878: <FaSpaceShuttle />,           // Science Fiction (Changed to FaRocket)
  53: <FaExclamationTriangle />, // Thriller (Changed to FaExclamationTriangle)
  10752: <FaShieldAlt />,      // War (Changed to FaShieldAlt)
  37: <FaHorse />,             // Western (Changed to FaHorse)
  10770: <FaTv />              // TV Movie
};


  return (
    <div>
      {/* Button to navigate back to the landing page */}
      <div className="back-button-container">
        <button onClick={() => router.push('/')}>Back to Prompt</button> {/* Navigates back */}
      </div>

      {/* Trending Movies Section */}
      <div className="movie-container">
        <h1>Trending Movies</h1>
        <Swiper
          grabCursor={true}
          speed={400}
          modules={[Scrollbar, Mousewheel]}
          mousewheel={{ invert: false }}
          scrollbar={{ draggable: true }}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            900: { slidesPerView: 2, spaceBetween: 20 },
            1200: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {trendingMovies.map((movie) => (
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
                  <button onClick={() => handleReadMore(movie.id)}>Read More</button>
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
          modules={[Scrollbar, Mousewheel]}
          mousewheel={{ invert: false }}
          scrollbar={{ draggable: true }}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            900: { slidesPerView: 2, spaceBetween: 20 },
            1200: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {topRatedMovies.map((movie) => (
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
                  <button onClick={() => handleReadMore(movie.id)}>Read More</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Top Rated TV Shows Section */}
      <div className="movie-container">
        <h1>Top Rated TV Shows</h1>
        <Swiper
          grabCursor={true}
          speed={400}
          modules={[Scrollbar, Mousewheel]}
          mousewheel={{ invert: false }}
          scrollbar={{ draggable: true }}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            900: { slidesPerView: 2, spaceBetween: 20 },
            1200: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {topRatedTVShows.map((show) => (
            <SwiperSlide key={show.id}>
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                  alt={show.name}
                  className="post-img"
                />
                <div className="info">
                  <h1>{show.name}</h1>
                  <p>{show.overview.substring(0, 100)}...</p>
                  <button onClick={() => handleReadMoreTVShow(show.id)}>Read More</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Search Section */}
      <div className="search-container">
        <h1>Search Movies</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Genres Section */}
      <div className="genres-container">
        <h1>Discover by Genre</h1>
        <div className="buttons">
          {genres.map((genre) => (
            <button key={genre.id} onClick={() => handleDiscoverByGenre(genre.id)}>
              {genreIcons[genre.id]} {/* Add the icon */}
              <p>{genre.name}</p> {/* Genre name */}
            </button>
          ))}
        </div>
      </div>

      {/* Discover Movies Section */}
      {discoverMovies.length > 0 && (
        <div className="movie-container">
          <h1>Discovered Movies</h1>
          <Swiper
            grabCursor={true}
            speed={400}
            modules={[Scrollbar, Mousewheel]}
            mousewheel={{ invert: false }}
            scrollbar={{ draggable: true }}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              900: { slidesPerView: 2, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 20 },
            }}
          >
            {discoverMovies.map((movie) => (
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
                    <button onClick={() => handleReadMore(movie.id)}>Read More</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
