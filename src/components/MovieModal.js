function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#222",
          padding: "20px",
          borderRadius: "10px",
          color: "white",
          width: "400px",
          textAlign: "center",
        }}
      >
        <img
          src={movie.image}
          alt={movie.name}
          style={{
            width: "200px",
            borderRadius: "10px",
          }}
        />

        <h2>{movie.name}</h2>

        <p>⭐ {movie.rating}</p>

        <p>
          This is a sample movie description for {movie.name}.
        </p>

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default MovieModal;