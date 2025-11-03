import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    sports: []
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedSports = checked
          ? [...prev.sports, value]
          : prev.sports.filter((sport) => sport !== value);
        return { ...prev, sports: updatedSports };
      });
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5055/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Registered Successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          dob: "",
          gender: "",
          sports: []
        });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage("❌ Registration Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server Error. Try again later.");
    }
  };

  return (
    <div id="registerpage" className="register-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-header">
                <h4>🏅 Join SportsHub</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" id="name" value={formData.name} onChange={handleChange} className="form-control" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" value={formData.email} onChange={handleChange} className="form-control" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" value={formData.password} onChange={handleChange} className="form-control" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input type="date" id="dob" value={formData.dob} onChange={handleChange} className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select id="gender" value={formData.gender} onChange={handleChange} className="form-select">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Sports Preferences</label>
                    <div>
                      {["Football", "Basketball", "Tennis", "Running", "Swimming"].map((sport) => (
                        <div className="form-check form-check-inline" key={sport}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={sport}
                            value={sport}
                            checked={formData.sports.includes(sport)}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">{sport}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-success w-100">Register</button>
                </form>

                {message && <div className="fw-bold mt-3 text-center">{message}</div>}

                <div className="text-center mt-3">
                  Already have an account? <a href="/login">Login here</a>
                </div>
              </div>
            </div>
            <div className="text-center mt-3 text-black"  style={{ marginBottom: "20px" }}>
              🚴‍♂️ Start your fitness journey with <strong>Our store</strong>!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
