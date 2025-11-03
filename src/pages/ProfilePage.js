import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      navigate("/login");
    } else {
      setUser(savedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goToOrders = () => {
    navigate("/orders");
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card animate-fade">
        <h2 className="profile-title">👤 Profile Information</h2>

        <div className="profile-info">
          <p><strong>Full Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
          <p><strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : "Not provided"}</p>
          <p><strong>Gender:</strong> {user.gender || "Not specified"}</p>
          <p>
            <strong>Sports Preferences:</strong>{" "}
            {user.sports && user.sports.length > 0 ? user.sports.join(", ") : "No preferences selected"}
          </p>
        </div>

        <div className="profile-buttons">
          <button onClick={goToOrders} className="orders-btn">
            📦 Order History
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
