import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import ApiServices from "../../ApiServices";

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

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.password.trim() &&
    formData.contact.trim() &&
    formData.address.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await ApiServices.postData("customer/customer/add", formData);
      if (res?.data?.success) {
        toast.success(res.data.message || "Customer registered successfully!");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.data.message || "Customer registration successful!",
        }).then(() => navigate("/customer-login"));
      } else {
        toast.error(res?.data?.message || "Registration failed!");
      }
    } catch (err) {
      console.error("Customer registration error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-background">
      <ToastContainer position="top-center" />
      <div className={`register-box ${animate ? "active" : ""}`}>
        <form onSubmit={handleSubmit}>
          <h2>Customer Registration</h2>

          {["name", "email", "password", "contact", "address"].map(
            (field, index) => (
              <div
                key={field}
                className={`register-input-box ${animate ? "active" : ""}`}
                style={{ transitionDelay: `${0.3 + index * 0.2}s` }}
              >
                <input
                  type={
                    field === "password"
                      ? "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  name={field}
                  placeholder={
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            )
          )}

          <button
            type="submit"
            className={`register-button ${animate ? "active" : ""}`}
            disabled={loading || !isFormValid}
            style={{ transitionDelay: "1.3s" }}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Register"}
          </button>

          <div
            className={`register-link ${animate ? "active" : ""}`}
            style={{ transitionDelay: "1.5s" }}
          >
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;
