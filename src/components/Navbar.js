import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="logo">
        NETFLIX
      </Link>

      <div className="navbar-links">
        <Link to="/home" className="nav-link">
          Home
        </Link>

        <Link to="/favorites" className="nav-link">
          Favorites <span className="favorites-heart">❤️</span>
        </Link>

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;