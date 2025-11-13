// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="container-fluid nav-bar bg-light">
        <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 py-lg-0 px-lg-4">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center m-0 p-0 d-lg-none"
          >
            <h1 className="text-primary m-0">Plumberz</h1>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars" />
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav me-auto">
              <Link to="/" className="nav-item nav-link active">
                Home
              </Link>
              <Link to="/about" className="nav-item nav-link">
                About
              </Link>
              <Link to="/service" className="nav-item nav-link">
                Services
              </Link>

              <div className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Pages
                </Link>
                <div className="dropdown-menu fade-up m-0">
                  <Link to="/booking" className="dropdown-item">
                    Booking
                  </Link>
                  <Link to="/team" className="dropdown-item">
                    Technicians
                  </Link>
                  <Link to="/testimonial" className="dropdown-item">
                    Testimonial
                  </Link>
                  <Link to="/404" className="dropdown-item">
                    404 Page
                  </Link>
                </div>
              </div>

              <Link to="/booking" className="nav-item nav-link">
                Contact
              </Link>

              {/* Unified Login Link */}
              <Link to="/login" className="nav-item nav-link">
                Login
              </Link>
            </div>

            <div className="mt-4 mt-lg-0 me-lg-n4 py-3 px-4 bg-primary d-flex align-items-center">
              <div
                className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white"
                style={{ width: 45, height: 45 }}
              >
                <i className="fa fa-phone-alt text-primary" />
              </div>
              <div className="ms-3">
                <p className="mb-1 text-white">Emergency 24/7</p>
                <h5 className="m-0 text-secondary">+012 345 6789</h5>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
