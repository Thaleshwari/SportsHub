import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'; // Your custom CSS

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // If user is already logged in, redirect to profile
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      navigate("/profile"); // Redirect logged-in user
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5055/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(result.user));
        setMessage("✅ Login Successful");
        // Redirect to profile page
        navigate("/profile");
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header">
                <h4>🏋️‍♂️ Welcome Back, Athlete!</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100">Login</button>
                  <div className="text-center mt-3">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => navigate("/reset-password")}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </form>

                {message && (
                  <div
                    className={`text-center mt-3 fw-bold ${
                      message.includes("❌") ? "text-danger" : "text-success"
                    }`}
                  >
                    {message}
                  </div>
                )}
              </div>
            </div>

            <div className="text-center text-black mt-4">
              Don't have an account? <Link to="/register">Register Here!</Link>
            </div>

            <div className="text-center mt-2 text-black mb-4">
              🛒 Gear up at <strong>SportsHub</strong> – Your Fitness Partner!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
