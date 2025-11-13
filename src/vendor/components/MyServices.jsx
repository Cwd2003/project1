import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import ApiServices from "../../ApiServices";
import AddServices from "./AddServices";

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [editService, setEditService] = useState(null);
  const vendorId = sessionStorage.getItem("vendorId"); 

  const fetchMyServices = async () => {
    if (!vendorId) {
      toast.error("Vendor not logged in!");
      return;
    }

    try {
      const res = await ApiServices.getAllServices();
      if (res.data.success) {
        const myServices = res.data.data.filter(
          (s) => s.serviceProviderId === vendorId || s.serviceProviderId?._id === vendorId
        );
        setServices(myServices);
      } else {
        toast.error(res.data.message || "Failed to fetch services");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching services");
    }
  };

  const handleDelete = async (id) => {
    if (!vendorId) return toast.error("Vendor not logged in!");
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const res = await ApiServices.deleteService(id);
        if (res.data.success) {
          toast.success("Service deleted successfully!");
          fetchMyServices();
        } else {
          toast.error(res.data.message || "Failed to delete service");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error deleting service");
      }
    }
  };

  const handleEdit = (service) => {
    setEditService(service);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditService(null);
  };

  useEffect(() => {
    fetchMyServices();
  }, []);

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={2000} />

      <AddServices onServiceAdded={fetchMyServices} editService={editService} onCancelEdit={cancelEdit} />

      <h2 className="my-4 text-center">My Services</h2>

      {services.length > 0 ? (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-bordered align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {services.map((s, i) => (
                <tr key={s._id}>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>₹{s.price}</td>
                  <td>{s.description}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(s)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-4">
          <h5 className="text-secondary">No services found!</h5>
        </div>
      )}
    </div>
  );
};

export default MyServices;
