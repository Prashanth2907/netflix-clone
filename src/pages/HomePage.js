
import { useState, useEffect } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { SEARCH_URL, DETAILS_URL } from "../api";
import { useFavorites } from "../Context/FavoritesContext";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavorites();

  useEffect(() => {
    fetchMovies("movie");
  }, []);

  const fetchMovies = async (movieName) => {
    try {
      const response = await fetch(SEARCH_URL + movieName);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovies([]);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(DETAILS_URL + imdbID);
      const data = await response.json();

      if (data.Response === "True") {
        setSelectedMovie(data);
      }
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchMovies(value.trim() || "movie");
  };

  return (
    <div className="app">
      <Navbar />

      <div className="banner">
        <div className="overlay">
          <div className="banner-content">
            <h1>
              Unlimited Movies,
              <br />
              TV Shows & More
            </h1>
            <p>Watch anywhere. Cancel anytime.</p>
            <input
              type="text"
              placeholder="Search Movies..."
              className="search-box"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="movies-section">
        <h2>Trending Movies</h2>
        <div className="movies-row">
          {movies
            .filter(
              (movie) => movie.Poster && movie.Poster !== "N/A"
            )
            .map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                isFavorite={favorites.some(
                  (fav) => fav.imdbID === movie.imdbID
                )}
                setSelectedMovie={() =>
                  fetchMovieDetails(movie.imdbID)
                }
              />
            ))}
        </div>
      </div>

      {selectedMovie && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedMovie.Poster}
              alt={selectedMovie.Title}
            />
            <h2>{selectedMovie.Title}</h2>
            <p>
              <strong>Year:</strong> {selectedMovie.Year}
            </p>
            <p>
              <strong>IMDb Rating:</strong> ⭐{" "}
              {selectedMovie.imdbRating}
            </p>
            <p>
              <strong>Genre:</strong> {selectedMovie.Genre}
            </p>
            <p>
              <strong>Plot:</strong> {selectedMovie.Plot}
            </p>
            <button
              className="modal-button"
              onClick={() => setSelectedMovie(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
