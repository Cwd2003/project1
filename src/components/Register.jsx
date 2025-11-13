import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import ApiServices from "../ApiServices";

function CustomerRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  // Validation
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.contact.trim() !== "" &&
    formData.address.trim() !== "";

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      contact: formData.contact,
      address: formData.address,
    };

    try {
      // API call
      const res = await ApiServices.postData("customer/customer/add", data);
      console.log("Customer Register API Response:", res);

      if (res?.data?.success) {
        toast.success(res.data.message || "Customer Registered Successfully!", { autoClose: 2000 });
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.data.message || "Customer registration completed successfully.",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/login");
        });
      } else {
        toast.error(res?.data?.message || "Registration failed!");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res?.data?.message || "Customer registration failed!",
        });
      }
    } catch (err) {
      console.error("Customer Registration Error:", err);
      toast.error("Something went wrong!");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong during registration!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-background">
      <ToastContainer position="top-center" />
      <div className={`register-box ${animate ? "active" : ""}`}>
        <form onSubmit={handleSubmit}>
          <h2>Customer Register</h2>

          {/* Name */}
          <div className={`register-input-box ${animate ? "active" : ""}`} style={{ transitionDelay: "0.3s" }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className={`register-input-box ${animate ? "active" : ""}`} style={{ transitionDelay: "0.5s" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className={`register-input-box ${animate ? "active" : ""}`} style={{ transitionDelay: "0.7s" }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact */}
          <div className={`register-input-box ${animate ? "active" : ""}`} style={{ transitionDelay: "0.9s" }}>
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className={`register-input-box ${animate ? "active" : ""}`} style={{ transitionDelay: "1.1s" }}>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`register-button ${animate ? "active" : ""}`}
            disabled={loading || !isFormValid}
            style={{ transitionDelay: "1.3s" }}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Register"}
          </button>

          {/* Link */}
          <div className={`register-link ${animate ? "active" : ""}`} style={{ transitionDelay: "1.5s" }}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;
