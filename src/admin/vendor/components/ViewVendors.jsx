import React, { useEffect, useState } from "react";
import ApiServices from "../../../ApiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const ViewVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState("card"); // 'card' or 'table'
    const navigate = useNavigate();


  // ✅ Fetch all vendors
  const fetchVendors = () => {
    setLoading(true);
    ApiServices.GetAllVendors()
      .then((res) => {
        if (res.data.success) {
          setVendors(res.data.data || []);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Error fetching vendors"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // ✅ Toggle vendor login active/inactive
  const handleChangeStatus = (vendor) => {
    const vendorId = vendor.userId?._id;
    const currentStatus = vendor.userId?.status;
    const newStatus = !currentStatus;

    if (!vendorId) {
      toast.error("Invalid vendor user ID");
      return;
    }

    ApiServices.ChangeVendorStatus({ _id: vendorId, status: newStatus })
      .then((res) => {
        if (res.data.success) {
          toast.success(
            `Vendor login ${newStatus ? "activated" : "deactivated"} successfully!`
          );
          fetchVendors();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Error changing vendor status"));
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-center flex-grow-1">Vendor Management</h2>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setViewType(viewType === "card" ? "table" : "card")}
        >
          Switch to {viewType === "card" ? "Table" : "Card"} View
        </button>
      </div>

      <BarLoader cssOverride={{ marginLeft: "45%" }} loading={loading} />

      {!loading && viewType === "card" && (
        <div className="row">
          {vendors.length > 0 ? (
            vendors.map((v) => (
              <div className="col-md-4 mb-4" key={v._id}>
                <div className="card shadow-sm h-100">
                  <img
                    src={v.image}
                    className="card-img-top"
                    alt={v.name}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-primary">{v.name}</h5>
                    <p className="card-text mb-1">
                      <strong>Email:</strong> {v.email}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Contact:</strong> {v.contact}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Address:</strong> {v.address}
                    </p>
                    <p className="card-text">
                      <strong>Experience:</strong> {v.experience}
                    </p>
                    <span
                      className={`badge ${
                        v.userId?.status ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {v.userId?.status ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="card-footer text-center">
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() =>
                     navigate(`/admin/vendor/${v._id}`) }
                    >
                      View
                    </button>
                    <button
                      className={`btn btn-sm ${
                        v.userId?.status ? "btn-warning" : "btn-success"
                      }`}
                      onClick={() => handleChangeStatus(v)}
                    >
                      {v.userId?.status ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No vendors found.</p>
          )}
        </div>
      )}

      {!loading && viewType === "table" && (
        <table className="table table-striped table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Vendor Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Login Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.length > 0 ? (
              vendors.map((v, i) => (
                <tr key={v._id}>
                  <td>{i + 1}</td>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.contact}</td>
                  <td>
                    <span
                      className={`badge ${
                        v.userId?.status ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {v.userId?.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() =>
                        window.location.assign(`/admin/vendor/${v._id}`)
                      }
                    >
                      View
                    </button>
                    <button
                      className={`btn btn-sm ${
                        v.userId?.status ? "btn-warning" : "btn-success"
                      }`}
                      onClick={() => handleChangeStatus(v)}
                    >
                      {v.userId?.status ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-muted">
                  No vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewVendors;
