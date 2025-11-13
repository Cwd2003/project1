import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiServices from "../../ApiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewReviews() {
  const [reviews, setReviews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [vendorFilter, setVendorFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [vendors, setVendors] = useState([]);

  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = () => {
    ApiServices.GetAllReviews()
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data || [];
          setReviews(data);
          setFiltered(data);
          // Get unique vendor names for dropdown filter
          const uniqueVendors = [
            ...new Set(data.map((r) => r.vendorName || "Unknown")),
          ];
          setVendors(uniqueVendors);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Failed to fetch reviews"));
  };

  // 🔍 Live Search + Filter logic
  useEffect(() => {
    let data = reviews;

    if (search) {
      data = data.filter(
        (r) =>
          r.customerName?.toLowerCase().includes(search.toLowerCase()) ||
          r.comment?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (vendorFilter) {
      data = data.filter((r) => r.vendorName === vendorFilter);
    }

    setFiltered(data);
    setCurrentPage(1);
  }, [search, vendorFilter, reviews]);

  const handleStatusChange = (id, status) => {
    const newStatus = status === "Active" ? "Inactive" : "Active";
    ApiServices.ChangeReviewStatus({ _id: id, status: newStatus })
      .then((res) => {
        if (res.data.success) {
          toast.success("Status updated!");
          fetchAllReviews();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Error changing status"));
  };

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3 className="text-center mb-4">All Reviews</h3>

      {/* Search and Filter Controls */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by customer or comment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={vendorFilter}
            onChange={(e) => setVendorFilter(e.target.value)}
          >
            <option value="">Filter by Vendor</option>
            {vendors.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-secondary w-100"
            onClick={() => {
              setSearch("");
              setVendorFilter("");
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Review Table */}
      <table className="table table-bordered text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Vendor</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((rev, index) => (
              <tr key={rev._id}>
                <td>{startIndex + index + 1}</td>
                <td>{rev.customerName || "N/A"}</td>
                <td>{rev.vendorName || "N/A"}</td>
                <td>{rev.rating}</td>
                <td>{rev.comment}</td>
                <td>
                  <span
                    className={`badge ${
                      rev.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {rev.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/admin/review/update/${rev._id}`)
                    }
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(rev._id, rev.status)
                    }
                    className={`btn btn-sm ${
                      rev.status === "Active"
                        ? "btn-danger"
                        : "btn-success"
                    }`}
                  >
                    {rev.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No reviews found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-primary me-2"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            ◀ Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn ${
                currentPage === i + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              } mx-1`}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-primary ms-2"
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
