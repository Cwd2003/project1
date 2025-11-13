import { useState } from "react";
import PageHeader from "../../PageHeader";
import { toast, ToastContainer } from "react-toastify";
import ApiServices from "../../ApiServices";
import "react-toastify/dist/ReactToastify.css";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Category name cannot be empty");
    if (!description.trim()) return toast.error("Description cannot be empty");
    if (!image) return toast.error("Please select an image");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("image", image);

      const response = await ApiServices.AddCategory(formData);

      if (response.data.success) {
        toast.success("Category added successfully");
        setName("");
        setDescription("");
        setImage(null);
        setPreview(null);
      } else {
        toast.error(response.data.message || "Failed to add category");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 409) {
        toast.error("Category already exists!");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <PageHeader child={"Add Category"} />
      <div className="container mt-4">
        <ToastContainer />
        <form onSubmit={handleAddCategory}>
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {preview && (
            <div className="mb-3">
              <label className="form-label">Preview:</label>
              <br />
              <img
                src={preview}
                alt="Preview"
                style={{ width: "200px", height: "auto", borderRadius: "5px" }}
              />
            </div>
          )}

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </main>
  );
}
