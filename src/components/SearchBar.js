function SearchBar() {
  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search Movies..."
        style={{
          width: "300px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none"
        }}
      />
    </div>
  );
}

export default SearchBar;