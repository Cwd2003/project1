import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiServices from "../../ApiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    ApiServices.GetSingleCustomer({ _id: id })
      .then((res) => {
        if (res.data.success) {
          setFormData(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Failed to load customer"));
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = (e) => {
    e.preventDefault();
    ApiServices.UpdateCustomer({ _id: id, ...formData })
      .then((res) => {
        if (res.data.success) {
          toast.success("Customer updated successfully!");
          setTimeout(() => navigate("/admin/customer"), 1500);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Error updating customer"));
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3 className="text-center mb-3">Update Customer</h3>

      <form onSubmit={handleUpdate} className="shadow p-4 col-md-6 offset-md-3">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Customer
        </button>
      </form>
    </div>
  );
}
