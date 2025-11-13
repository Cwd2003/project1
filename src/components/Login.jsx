import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ClipLoader, BarLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import ApiServices from "../ApiServices";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Detect role from URL (admin-login, vendor-login, customer-login)
  const role =
    location.pathname.includes("admin")
      ? "admin"
      : location.pathname.includes("vendor")
        ? "vendor"
        : "customer";

  const getTitle = () => {
    if (role === "admin") return "Admin Login";
    if (role === "vendor") return "Vendor Login";
    if (location.pathname === "/login") return "Login";
    return "Customer Login";
  };


  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
    const rememberedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (rememberedUser) {
      setFormData({
        username: rememberedUser.username,
        password: rememberedUser.password,
        remember: true,
      });
    }
  }, []);

  const isFormValid =
    formData.username.trim() !== "" && formData.password.trim() !== "";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.username.trim() || !formData.password.trim()) {
    toast.warn("Please enter email and password");
    return;
  }

  setLoading(true);

  try {
    const data = { email: formData.username, password: formData.password };
    const res = await ApiServices.Login(data);
    const result = res.data;

    if (result?.success) {
      const user = result.data;

      // ✅ Store session info
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("vendorId", user._id); // for vendors
      sessionStorage.setItem("name", user.name);
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem("userType", user.userType);

      // ✅ Remember me logic
      if (formData.remember) {
        localStorage.setItem("loggedInUser", JSON.stringify({
          username: formData.username,
          password: formData.password,
        }));
      } else {
        localStorage.removeItem("loggedInUser");
      }

      setApiStatus("success");
      toast.success(result.message || "Login successful", { autoClose: 2000 });

      // ✅ Show success popup
      Swal.fire({
        icon: "success",
        title: `Welcome, ${user.name}!`,
        text: "Login Successful",
        confirmButtonColor: "#00bfff",
      }).then(() => {
        // ✅ Redirect according to userType
        if (user.userType === 1) navigate("/admin/");
        else if (user.userType === 2) navigate("/vendor/");
        else if (user.userType === 3) navigate("/customer/");
        else navigate("/");
      });
    } else {
      setApiStatus("error");
      toast.error(result?.message || "Invalid credentials");
    }
  } catch (err) {
    console.error("Login error:", err);
    setApiStatus("error");
    toast.error("Something went wrong! Please try again.");
  } finally {
    setLoading(false);
  }
};


  // Render JSON output
  const renderJson = (obj) => {
    if (!obj) return null;
    return Object.keys(obj).map((key) => {
      const value = obj[key];
      let color = "#0ff";
      if (key.toLowerCase() === "token") color = "#0f0";
      else if (key.toLowerCase() === "error") color = "#f00";
      else if (key.toLowerCase() === "message" && apiStatus === "error")
        color = "#f00";

      if (typeof value === "object" && value !== null) {
        return (
          <div key={key} style={{ marginLeft: "10px" }}>
            <strong style={{ color }}>{key}:</strong>
            <div style={{ marginLeft: "10px" }}>{renderJson(value)}</div>
          </div>
        );
      }
      return (
        <div key={key}>
          <strong style={{ color }}>{key}:</strong> <span>{value}</span>
        </div>
      );
    });
  };

  return (
    <div className="login-page-background">
      <ToastContainer position="top-center" />
      <div className={`login-box ${animate ? "active" : ""}`}>
        <h2>{getTitle()}</h2>

        {loading && <BarLoader width="100%" color="#00bfff" />}

        {!loading && (
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div
              className={`login-input-box ${animate ? "active" : ""}`}
              style={{ transitionDelay: "0.3s" }}
            >
              <FaUser className="login-icon" />
              <input
                type="text"
                name="username"
                placeholder="Email"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div
              className={`login-input-box ${animate ? "active" : ""}`}
              style={{ transitionDelay: "0.5s" }}
            >
              <FaLock className="login-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Options */}
            <div
              className={`login-options ${animate ? "active" : ""}`}
              style={{ transitionDelay: "0.7s" }}
            >
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />{" "}
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className={`login-button ${animate ? "active" : ""}`}
              disabled={loading || !isFormValid}
              style={{ transitionDelay: "0.9s" }}
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : "Login"}
            </button>

            {/* Register */}
            <div
              className={`login-register-link ${animate ? "active" : ""}`}
              style={{ transitionDelay: "1.1s" }}
            >
              Don’t have an account?{" "}
              <Link to="/vendor-register" className="mx-2 text-primary">
                Register as Vendor
              </Link>
              |
              <Link to="/customer-register" className="mx-2 text-primary">
                Register as Customer
              </Link>
            </div>

          </form>
        )}

        {/* API Response */}
        {apiResponse && (
          <div
            style={{
              marginTop: "20px",
              background:
                apiStatus === "success"
                  ? "rgba(0,255,0,0.1)"
                  : "rgba(255,0,0,0.1)",
              color: apiStatus === "success" ? "#0f0" : "#f00",
              padding: "10px",
              borderRadius: "5px",
              textAlign: "left",
              maxHeight: "300px",
              overflowY: "auto",
              fontSize: "12px",
              border: `1px solid ${apiStatus === "success" ? "#0f0" : "#f00"
                }`,
            }}
          >
            <strong>API Response:</strong>
            <div>{renderJson(apiResponse)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
