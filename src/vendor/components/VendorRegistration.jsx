import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaFileImage,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import ApiServices, { BaseUrl } from "../../ApiServices";
import "react-toastify/dist/ReactToastify.css";
import "./VendorRegister.css";

export default function VendorRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    description: "",
    businessContact: "",
    businessEmail: "",
    experience: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Animation on load
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelector(".register-box").classList.add("active");
      document
        .querySelectorAll(".register-input-box, .register-button, .register-link")
        .forEach((el, i) => {
          setTimeout(() => el.classList.add("active"), i * 120);
        });
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  // handle change for text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle image upload + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.contact ||
      !formData.address ||
      !formData.description ||
      !formData.businessContact ||
      !formData.businessEmail ||
      !formData.experience ||
      !formData.image
    ) {
      toast.warning("Please fill in all fields!");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    setLoading(true);
    try {
      const res = await ApiServices.addServiceProvider(formDataToSend);

      if (res.data.success) {
        toast.success("Registration Successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-background">
      <ToastContainer />
      <div className="register-box">
        <h2>Vendor Registration</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="register-input-box">
            <FaUser className="register-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-box">
            <FaEnvelope className="register-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-box">
            <FaLock className="register-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-box">
            <FaPhone className="register-icon" />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-box">
            <FaMapMarkerAlt className="register-icon" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-box">
            <FaBriefcase className="register-icon" />
            <input
              type="text"
              name="description"
              placeholder="Business Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-box">
            <FaPhone className="register-icon" />
            <input
              type="text"
              name="businessContact"
              placeholder="Business Contact Number"
              value={formData.businessContact}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-box">
            <FaEnvelope className="register-icon" />
            <input
              type="email"
              name="businessEmail"
              placeholder="Business Email"
              value={formData.businessEmail}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-box">
            <FaBriefcase className="register-icon" />
            <input
              type="text"
              name="experience"
              placeholder="Experience (in years)"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-box file-upload-box">
            <FaFileImage className="register-icon" />
            <label htmlFor="image-upload" className="custom-file-upload">
              {formData.image ? "Change Image" : "Upload Image"}
            </label>
            <input
              id="image-upload"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.image && <span className="file-name">{formData.image.name}</span>}
          </div>


          {/* Image preview */}
          {preview && (
            <div className="image-preview-container">
              <img src={preview} alt="Preview" className="image-preview" />
            </div>
          )}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? <ClipLoader color="#fff" size={18} /> : "Register"}
          </button>
        </form>

        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
