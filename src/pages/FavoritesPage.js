import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../Context/FavoritesContext";
import "../App.css";

function FavoritesPage() {
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavorites();

  return (
    <div className="app favorites-page">
      <Navbar />

      <section className="movies-section">
        <h2>❤️ My Favorites</h2>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <h3>Your favorites list is empty.</h3>
            <p>Add movies from the Home page to see them here.</p>

            <Link to="/home" className="favorites-home-link">
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="movies-row">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={true}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                setSelectedMovie={() => {}}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default FavoritesPage;