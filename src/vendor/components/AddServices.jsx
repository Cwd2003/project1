import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import ApiServices from "../../ApiServices";

const AddServices = ({ onServiceAdded, editService, onCancelEdit }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const vendorId = sessionStorage.getItem("vendorId");

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await ApiServices.GetAllCategory();
        if (res.data.success) setCategories(res.data.data);
      } catch (err) {
        toast.error("Error loading categories");
      }
    };
    fetchCategories();
  }, []);

  
  useEffect(() => {
    if (editService) {
      setName(editService.name);
      setPrice(editService.price);
      setDescription(editService.description);
      setCategoryId(editService.categoryId);
      setImage(null); 
    } else {
      setName("");
      setPrice("");
      setDescription("");
      setCategoryId("");
      setImage(null);
    }
  }, [editService]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !description || !categoryId) {
      toast.warn("Fill all fields");
      return;
    }

    if (!vendorId) {
      toast.error("Vendor not logged in!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("serviceProviderId", vendorId);
    if (image) formData.append("image", image);

    try {
      let res;
      if (editService) {
        formData.append("id", editService._id);
        res = await ApiServices.updateService(editService._id, formData);
      } else {
        res = await ApiServices.addService(formData);
      }

      if (res.data.success) {
        toast.success(editService ? "Service updated!" : "Service added!");
        setName("");
        setPrice("");
        setDescription("");
        setCategoryId("");
        setImage(null);
        onServiceAdded(); 
        if (onCancelEdit) onCancelEdit(); 
      } else {
        toast.error(res.data.message || "Failed to save service");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="mb-4">{editService ? "Edit Service" : "Add Service"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control mb-2"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="form-control mb-2"
        >
          <option value="">--Select Category--</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="form-control mb-2"
        />

        <button type="submit" className="btn btn-primary me-2">
          {editService ? "Update Service" : "Add Service"}
        </button>

        {editService && (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default AddServices;
