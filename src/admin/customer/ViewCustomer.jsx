import React, { useEffect, useState } from "react";
import ApiServices from "../../ApiServices";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewCustomer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage, statusFilter]);

  const fetchCustomers = (page = 1) => {
    setLoading(true);
    ApiServices.GetCustomerPagination({
      page,
      pageSize: 5,
      search: search.trim() || undefined,
      status: statusFilter || undefined,
    })
      .then((res) => {
        if (res.data.success) {
          setCustomers(res.data.data || []);
          setTotalPages(res.data.totalPages || 1);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Failed to load customers"))
      .finally(() => setLoading(false));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCustomers(1);
  };

  const handleStatusChange = (id, status) => {
    ApiServices.ChangeCustomerStatus({ _id: id, status: !status })
      .then((res) => {
        if (res.data.success) {
          toast.success("Status updated!");
          fetchCustomers(currentPage);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Error changing status"));
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3 className="text-center mb-4">All Customers</h3>

      {/* Search + Status Filter */}
      <form onSubmit={handleSearch} className="d-flex mb-3 gap-3 justify-content-center">
        <input
          type="text"
          placeholder="Search by name or email"
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
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {/* Customers Table */}
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : customers.length > 0 ? (
              customers.map((cust, i) => (
                <tr key={cust._id}>
                  <td>{(currentPage - 1) * 5 + (i + 1)}</td>
                  <td>{cust.name}</td>
                  <td>{cust.email}</td>
                  <td>{cust.phone}</td>
                  <td>
                    <span className={`badge ${cust.status ? "bg-success" : "bg-secondary"}`}>
                      {cust.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin/customer/single/${cust._id}`} className="btn btn-info btn-sm me-2">View</Link>
                    <Link to={`/admin/customer/update/${cust._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                    <button
                      className={`btn btn-sm ${cust.status ? "btn-danger" : "btn-success"}`}
                      onClick={() => handleStatusChange(cust._id, cust.status)}
                    >
                      {cust.status ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No customers found.</td>
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
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary ms-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
