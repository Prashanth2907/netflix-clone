function MovieCard({
  movie,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  setSelectedMovie,
}) {
  return (
    <div
      className="movie-card"
      onClick={() => setSelectedMovie(movie)}
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
      />

      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <p>{movie.Year}</p>

        {isFavorite ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFromFavorites(movie.imdbID);
            }}
          >
            Remove Favorite
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToFavorites(movie);
            }}
          >
            Add Favorite
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;