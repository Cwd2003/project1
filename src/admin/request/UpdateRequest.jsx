import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiServices from "../../ApiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState({
    serviceName: "",
    customerName: "",
    date: "",
    details: "",
  });

  useEffect(() => {
    ApiServices.GetSingleRequest({ _id: id })
      .then((res) => {
        if (res.data.success) {
          setRequestData(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Failed to load request"));
  }, [id]);

  const handleChange = (e) => {
    setRequestData({ ...requestData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    ApiServices.UpdateRequest({ _id: id, ...requestData })
      .then((res) => {
        if (res.data.success) {
          toast.success("Request updated successfully!");
          setTimeout(() => navigate("/admin/request"), 1500);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Error updating request"));
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3 className="text-center mb-3">Update Request</h3>

      <form onSubmit={handleUpdate} className="shadow p-4 col-md-6 offset-md-3">
        <div className="mb-3">
          <label className="form-label">Service Name</label>
          <input
            type="text"
            className="form-control"
            name="serviceName"
            value={requestData.serviceName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            name="customerName"
            value={requestData.customerName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={requestData.date}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Details</label>
          <textarea
            className="form-control"
            name="details"
            rows="3"
            value={requestData.details}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Request
        </button>
      </form>
    </div>
  );
}
