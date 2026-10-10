import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "../App.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const success = login(email.trim(), password);

    if (success) {
      navigate("/home");
    } else {
      setError("Please enter a valid email and password.");
    }
  };

  return (
    <main className="auth-page">
      <Link to="/" className="auth-logo">
        NETFLIX
      </Link>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Sign In</button>

        <p>
          New to Netflix? <Link to="/signup">Sign up now</Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;