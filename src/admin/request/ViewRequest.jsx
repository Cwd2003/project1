import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiServices from "../../ApiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests(currentPage);
  }, [currentPage, statusFilter]);

  const fetchRequests = (page = 1) => {
    setLoading(true);
    ApiServices.GetRequestPagination({
      page,
      pageSize: 5,
      search: search.trim() || undefined,
      status: statusFilter || undefined,
    })
      .then((res) => {
        if (res.data.success) {
          setRequests(res.data.data || []);
          setTotalPages(res.data.totalPages || 1);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Failed to load requests"))
      .finally(() => setLoading(false));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchRequests(1);
  };

  const handleStatusChange = (id, status) => {
    const newStatus = status === "Active" ? "Inactive" : "Active";
    ApiServices.ChangeRequestStatus({ _id: id, status: newStatus })
      .then((res) => {
        if (res.data.success) {
          toast.success("Status updated!");
          fetchRequests(currentPage);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Error changing status"));
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3 className="text-center mb-4">All Service Requests</h3>

      {/* Search and Filters */}
      <form onSubmit={handleSearch} className="d-flex mb-3 gap-3 justify-content-center">
        <input
          type="text"
          placeholder="Search by customer or service name"
          className="form-control w-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : requests.length > 0 ? (
              requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{(currentPage - 1) * 5 + (index + 1)}</td>
                  <td>{req.customerName || "N/A"}</td>
                  <td>{req.serviceName || "N/A"}</td>
                  <td>{req.date || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.status === "Active" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/request/update/${req._id}`)}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleStatusChange(req._id, req.status)}
                      className={`btn btn-sm ${
                        req.status === "Active"
                          ? "btn-danger"
                          : "btn-success"
                      }`}
                    >
                      {req.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline-secondary ms-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
