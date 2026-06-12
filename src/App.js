import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import {
  SEARCH_URL,
  DETAILS_URL,
} from "./api";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites =
      localStorage.getItem("favorites");

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];
  });

  const [selectedMovie, setSelectedMovie] =
    useState(null);

  useEffect(() => {
    fetchMovies("movie");
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const fetchMovies = async (movieName) => {
    try {
      const response = await fetch(
        SEARCH_URL + movieName
      );

      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieDetails = async (
    imdbID
  ) => {
    try {
      const response = await fetch(
        DETAILS_URL + imdbID
      );

      const data = await response.json();

      setSelectedMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      fetchMovies("movie");
    } else {
      fetchMovies(value);
    }
  };

  const addToFavorites = (movie) => {
    const exists = favorites.find(
      (fav) => fav.imdbID === movie.imdbID
    );

    if (!exists) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(
      favorites.filter(
        (movie) => movie.imdbID !== id
      )
    );
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

            <p>
              Watch anywhere. Cancel anytime.
            </p>

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
              (movie) =>
                movie.Poster &&
                movie.Poster !== "N/A"
            )
            .map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                addToFavorites={addToFavorites}
                removeFromFavorites={
                  removeFromFavorites
                }
                isFavorite={favorites.some(
                  (fav) =>
                    fav.imdbID === movie.imdbID
                )}
                setSelectedMovie={() =>
                  fetchMovieDetails(
                    movie.imdbID
                  )
                }
              />
            ))}
        </div>
      </div>

      <div className="movies-section">
        <h2>❤️ My Favorites</h2>

        <div className="movies-row">
          {favorites.length === 0 ? (
            <p>No favorite movies yet.</p>
          ) : (
            favorites.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                addToFavorites={addToFavorites}
                removeFromFavorites={
                  removeFromFavorites
                }
                isFavorite={true}
                setSelectedMovie={() =>
                  fetchMovieDetails(
                    movie.imdbID
                  )
                }
              />
            ))
          )}
        </div>
      </div>

      {selectedMovie && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedMovie(null)
          }
        >
          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <img
              src={selectedMovie.Poster}
              alt={selectedMovie.Title}
            />

            <h2>
              {selectedMovie.Title}
            </h2>

            <p>
              <strong>Year:</strong>{" "}
              {selectedMovie.Year}
            </p>

            <p>
              <strong>
                IMDb Rating:
              </strong>{" "}
              ⭐
              {
                selectedMovie.imdbRating
              }
            </p>

            <p>
              <strong>Genre:</strong>{" "}
              {selectedMovie.Genre}
            </p>

            <p>
              <strong>Plot:</strong>{" "}
              {selectedMovie.Plot}
            </p>

            <button
              className="modal-button"
              onClick={() =>
                setSelectedMovie(null)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;