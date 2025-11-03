import React from "react";
import "./Header.css";
import img from "../images/logo.jpg";
import { NavLink } from "react-router-dom";
import CartIcon from './CartIcon';

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const profileLink = user ? "/Profile" : "/Login";

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 fixed-top" >
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={img} alt="logo" className="logo-img" />
            <span className="fw-bold text-danger fs-4">SportsHub</span>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-5 me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/Accessories">Accessories</NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sports
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/Cricket">Cricket</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/Badminton">Badminton</NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to="/About">About</NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-3 d-flex align-items-center">
                <CartIcon />
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to={profileLink}>
                  <i className="bi bi-person fs-4"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
