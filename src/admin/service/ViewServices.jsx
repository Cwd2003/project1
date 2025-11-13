import { useEffect, useState } from "react";
import PageHeader from "../../PageHeader";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
import ApiServices, { BaseUrl } from "../../ApiServices";
import "react-toastify/dist/ReactToastify.css";

export default function ViewServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const pageSize = 5; // number of services per page

  // Fetch categories for filter dropdown
  const fetchCategories = async () => {
    try {
      const res = await ApiServices.GetAllCategory();
      if (res.data.success) {
        setCategories(res.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch services with pagination + filter + search
  const fetchServices = async (page = 1) => {
    setLoading(true);
    try {
      const response = await ApiServices.GetServicePagination({
        page,
        pageSize,
        search,
        category_id: selectedCategory || undefined,
      });

      if (response.data.success) {
        setServices(response.data.services || []);
        setCurrentPage(page);
        setTotalPages(response.data.totalPages || 1);
      } else {
        toast.error(response.data.message || "Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchServices(currentPage);
  }, []);

  // Handle search/filter change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleFilterApply = () => {
    fetchServices(1); // Reset to first page on new filter
  };

  // Delete service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const response = await ApiServices.DeleteService({ id });
      if (response.data.success) {
        toast.success("Service deleted successfully");
        fetchServices(currentPage);
      } else {
        toast.error(response.data.message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong");
    }
  };

  // Change service status
  const handleChangeStatus = async (id) => {
    try {
      const response = await ApiServices.ChangeServiceStatus({ id });
      if (response.data.success) {
        toast.success("Service status changed successfully");
        fetchServices(currentPage);
      } else {
        toast.error(response.data.message || "Failed to change status");
      }
    } catch (error) {
      console.error("Change status error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) fetchServices(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) fetchServices(currentPage - 1);
  };

  return (
    <>
      <main className="main">
        <PageHeader child={"View Services"} />
        <section id="services" className="section about-us">
          <div className="container">
            <ToastContainer />
            <BarLoader cssOverride={{ marginLeft: "45%" }} loading={loading} />

            {/* Search & Filter */}
            <div className="d-flex justify-content-between mb-3">
              <input
                type="text"
                placeholder="Search by service name"
                value={search}
                onChange={handleSearchChange}
                className="form-control me-2"
                style={{ width: "50%" }}
              />
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="form-select me-2"
                style={{ width: "30%" }}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary" onClick={handleFilterApply}>
                Apply
              </button>
            </div>

            {!loading && (
              <div className="row gy-4">
                <div className="offset-md-1 col-md-10 shadow p-4">
                  <h4 className="mb-4 text-center">Available Services</h4>

                  <table className="table table-bordered table-striped">
                    <thead className="table-primary text-center">
                      <tr>
                        <th>Sr No</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price (₹)</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {services.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-muted">
                            No services found
                          </td>
                        </tr>
                      ) : (
                        services.map((service, index) => (
                          <tr key={service._id}>
                            <td>{(currentPage - 1) * pageSize + index + 1}</td>
                            <td>{service.name}</td>
                            <td>{service.category_name || service.category_id}</td>
                            <td>{service.price}</td>
                            <td>
                              <img
                                src={`${BaseUrl}/${service.image}`}
                                alt="Service"
                                style={{
                                  height: "60px",
                                  width: "60px",
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                }}
                              />
                            </td>
                            <td>
                              <Link
                                to={`/admin/editservice/${service._id}`}
                                className="btn btn-success btn-sm me-2"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(service._id)}
                                className="btn btn-danger btn-sm me-2"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handleChangeStatus(service._id)}
                                className="btn btn-warning btn-sm"
                              >
                                {service.status ? "Deactivate" : "Activate"}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

                  {/* Pagination Controls */}
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      className="btn btn-primary"
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
