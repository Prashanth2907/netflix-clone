import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "../App.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const success = signup(name.trim(), email.trim(), password);

    if (success) {
      navigate("/home");
    } else {
      setError("Please complete all fields.");
    }
  };

  return (
    <main className="auth-page">
      <Link to="/" className="auth-logo">
        NETFLIX
      </Link>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (at least 6 characters)"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={6}
          required
        />

        <button type="submit">Create Account</button>

        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </main>
  );
}

export default SignupPage;