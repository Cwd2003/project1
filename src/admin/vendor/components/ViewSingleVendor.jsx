import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiServices from "../../../ApiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewSingleVendor = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    if (!id) return;

    ApiServices.GetSingleVendor({ _id: id })
      .then((res) => {
        if (res.data.success) {
          setVendor(res.data.data);
        } else {
          toast.error(res.data.message || "Vendor not found");
        }
      })
      .catch(() => toast.error("Error fetching vendor details"));
  }, [id]);

  if (!vendor)
    return (
      <div className="text-center mt-5">
        <p>Loading vendor details...</p>
      </div>
    );

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3 className="text-center mb-3">Vendor Details</h3>
      <div className="card p-3 shadow">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="img-fluid mb-3"
          style={{ maxWidth: "300px", borderRadius: "10px" }}
        />
        <p><strong>Name:</strong> {vendor.name}</p>
        <p><strong>Email:</strong> {vendor.email}</p>
        <p><strong>Contact:</strong> {vendor.contact}</p>
        <p><strong>Address:</strong> {vendor.address}</p>
        <p><strong>Experience:</strong> {vendor.experience}</p>
        <p>
          <strong>Status:</strong>{" "}
          {vendor.userId?.status ? "Active" : "Inactive"}
        </p>
        <p><strong>Created At:</strong> {new Date(vendor.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ViewSingleVendor;
