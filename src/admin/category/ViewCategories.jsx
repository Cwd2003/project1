import { useEffect, useState } from "react";
import PageHeader from "../../PageHeader";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ApiServices from "../../ApiServices";
import "react-toastify/dist/ReactToastify.css";

export default function ViewCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await ApiServices.GetAllCategory();
      if (res.data.success && Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch categories");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Something went wrong while fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await ApiServices.DeleteCategory({ _id: id });
      if (res.data.success) {
        toast.success("Category deleted successfully");
        setCategories(categories.filter((cat) => cat._id !== id));
      } else {
        toast.error(res.data.message || "Failed to delete category");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Error deleting category");
    }
  };

  
  // Edit Category
  const handleEdit = (id) => {
    navigate(`/admin/updatecategory/${id}`);
  };

  return (
    <main className="main">
      <PageHeader child={"View Categories"} />
      <div className="container mt-4">
        <ToastContainer />
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <tr key={cat._id}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                    <td>{cat.description}</td>
                    <td>
                      <span
                        className={`badge ${
                          cat.status ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {cat.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          width="60"
                          height="60"
                          style={{ borderRadius: "5px" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(cat._id)}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="btn btn-danger btn-sm me-2"
                      >
                        Delete
                      </button>
                      
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
