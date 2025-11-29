import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function VendorHeader() {
  const nav = useNavigate();

  // Logout confirmation
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "Your session will end.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        nav("/login");
        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="container-fluid nav-bar bg-light shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 py-lg-0 px-lg-4">
        <Link
          to="/vendor"
          className="navbar-brand d-flex align-items-center m-0 p-0 d-lg-none"
        >
          <h1 className="text-primary m-0 fw-bold">Vendor Panel</h1>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars" />
        </button>

        {/*  Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav me-auto">
            <Link to="/vendor" className="nav-item nav-link active">
              Dashboard
            </Link>

            <Link to="/vendor/myservices" className="nav-item nav-link">
              My Services
            </Link>

            <Link to="/vendor/add-service" className="nav-item nav-link">
              Add Service
            </Link>

            <Link to="/vendor/profile" className="nav-item nav-link">
              My Profile
            </Link>
            <Link to="/vendor/booking" className="nav-item nav-link">
              Vendor Bookings
            </Link>

            <Link to="/vendor/change-password" className="nav-item nav-link">
              Change Password
            </Link>

            {/*Logout Button */}
            <button
              className="btn btn-danger ms-lg-3 mt-2 mt-lg-0"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {/* Right Side Support Info */}
          <div className="mt-4 mt-lg-0 me-lg-n4 py-3 px-4 bg-primary d-flex align-items-center rounded">
            <div
              className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white rounded-circle"
              style={{ width: 45, height: 45 }}
            >
              <i className="fa fa-phone-alt text-primary" />
            </div>
            <div className="ms-3">
              <p className="mb-1 text-white">Support 24/7</p>
              <h5 className="m-0 text-secondary">+012 345 6789</h5>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default VendorHeader;
