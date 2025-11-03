import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'; // Custom sports theme CSS

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/Login");
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };

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
        localStorage.setItem("user", JSON.stringify(result.user));
        setMessage("✅ Login Successfully");
        setUser(result.user);
        navigate("/");
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
                      className="btn btn-linkr"
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
            <div className="text-center text-black" style={{ marginTop: "40px" }}>
  Don't have an account? <Link to="/Register">Register Here!</Link>
</div>

            <div className="text-center mt-2 text-black" style={{ marginBottom: "40px" }}>
              🛒 Gear up at <strong>SportsHub</strong> – Your Fitness Partner!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import React from "react";
// import { FaUser, FaLock } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { Button } from "react-bootstrap";
// import "./Login.css";

// const LoginPage = () => {
//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-dark-blue">
//       <div className="login-card p-4 rounded shadow-lg">
//         <div className="text-center mb-3">
//           <img
//             src="/logo.png" // replace with your logo path
//             alt="Logo"
//             className="logo-img mb-2"
//           />
//           <h6 className="text-muted">Trusted Legal Advisors Since 1999</h6>
//         </div>

//         <div className="form-group mb-3">
//           <div className="input-group">
//             <span className="input-group-text bg-white border-end-0">
//               <FaUser className="text-gold" />
//             </span>
//             <input
//               type="text"
//               className="form-control border-start-0"
//               placeholder="Username"
//             />
//           </div>
//         </div>

//         <div className="form-group mb-2">
//           <div className="input-group">
//             <span className="input-group-text bg-white border-end-0">
//               <FaLock className="text-gold" />
//             </span>
//             <input
//               type="password"
//               className="form-control border-start-0"
//               placeholder="Password"
//             />
//           </div>
//         </div>

//         <div className="text-end mb-3">
//           <a href="/" className="text-decoration-none text-muted small">
//             Forget Password?
//           </a>
//         </div>

//         <Button variant="dark" className="w-100 mb-3">
//           Get Started
//         </Button>

//         <div className="text-center text-muted small mb-2">Or sign in with</div>

//         <div className="d-flex justify-content-between">
//           <Button variant="outline-secondary" className="w-100 me-2">
//             👤 Client Login
//           </Button>
//           <Button variant="outline-light" className="w-100 d-flex align-items-center justify-content-center">
//             <FcGoogle className="me-2" /> Google
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
