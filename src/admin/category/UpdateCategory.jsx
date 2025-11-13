import { useEffect, useState } from "react";
import PageHeader from "../../PageHeader";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ApiServices from "../../ApiServices";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await ApiServices.GetSingleCategory(id);
        if (res.data.success && res.data.data) {
          const cat = res.data.data;
          setName(cat.name);
          setDescription(cat.description || "");
        } else {
          toast.error(res.data.message || "Category not found");
        }
      } catch (err) {
        toast.error("Failed to fetch category");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCategory();
  }, [id]);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("_id", id);
      formData.append("name", name);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const res = await ApiServices.UpdateCategory(formData);

      if (res.data.success) {
        toast.success("Category updated successfully");
        setTimeout(() => navigate("/admin/viewcategories"), 1500);
      } else {
        toast.error(res.data.message || "Failed to update category");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Update Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <PageHeader child={"Update Category"} />
      <div className="container mt-4">
        <ToastContainer />
        <form onSubmit={handleUpdateCategory} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Enter category description"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </main>
  );
}
