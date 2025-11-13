import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiServices from "../../ApiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SingleCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    ApiServices.GetSingleCustomer({ _id: id })
      .then((res) => {
        if (res.data.success) {
          setCustomer(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Failed to load customer"));
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3 className="text-center mb-3">Customer Details</h3>
      <div className="card p-3 shadow">
        <p><b>Name:</b> {customer.name}</p>
        <p><b>Email:</b> {customer.email}</p>
        <p><b>Phone:</b> {customer.phone}</p>
        <p><b>Status:</b> {customer.status ? "Active" : "Inactive"}</p>
      </div>
    </div>
  );
}
