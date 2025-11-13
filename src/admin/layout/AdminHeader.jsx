import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminHeader() {
  const nav = useNavigate();

  function logoutfun() {
    Swal.fire({
      title: "Are you sure to logout?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!!",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        // nav("/");
         nav("/login");
        Swal.fire({
          title: "Logout!",
          text: "Logout successfully!!!",
          icon: "success",
        });
      }
    });
  }

  return (
    <div>
      {/* Navbar Start */}
      <div className="container-fluid nav-bar bg-light">
        <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 py-lg-0 px-lg-4">
          <Link
            to=""
            className="navbar-brand d-flex align-items-center m-0 p-0 d-lg-none"
          >
            <h1 className="text-primary m-0">AdminPanel</h1>
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
              <Link to="/admin" className="nav-item nav-link active">
                Home
              </Link>

              <Link to="/service" className="nav-item nav-link">
                Services
              </Link>

              {/* Category Dropdown */}
              <div className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Category
                </Link>
                <div className="dropdown-menu fade-up m-0">
                  <Link to="/admin/addcategory" className="dropdown-item">
                    Add Category
                  </Link>
                  <Link to="/admin/viewcategories" className="dropdown-item">
                    View Category
                  </Link>
                </div>
              </div>

              {/* ✅ Manage Vendors Section */}
                      <div className=" m-0 t-5">

                  <Link to="/admin/viewvendors" className="dropdown-item">
                    Manage Vendors
                  </Link>
            </div>

              <Link to="/booking" className="nav-item nav-link">
                Contact
              </Link>

              <button className="btn-getstarted" onClick={logoutfun}>
                Logout
              </button>
            </div>

            {/* Right Side Contact Info */}
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
      {/* Navbar End */}
    </div>
  );
}

export default AdminHeader;
