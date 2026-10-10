import { Link } from "react-router-dom";
import "../App.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-navbar">
        <Link to="/" className="landing-logo">
          NETFLIX
        </Link>

        <div className="landing-nav-buttons">
          <Link to="/login" className="landing-signin">
            Sign In
          </Link>

          <Link to="/signup" className="landing-get-started">
            Get Started
          </Link>
        </div>
      </header>

      <main className="landing-hero">
        <div className="landing-content">
          <h1>
            Unlimited Movies,
            <br />
            TV Shows &amp; More
          </h1>

          <p className="landing-subtitle">
            Watch anywhere. Cancel anytime.
          </p>

          <p className="landing-description">
            Discover movies, explore trending titles, and save your
            favorite movies in one place.
          </p>

          <Link to="/signup" className="landing-main-button">
            Get Started →
          </Link>

          <p className="landing-login-text">
            Already have an account?{" "}
            <Link to="/login">Sign In</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;