import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ApiServices from "../../ApiServices";
import "react-toastify/dist/ReactToastify.css";

export default function AddService() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAddService = async () => {
    if (!name || !price) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const response = await ApiServices.AddService({ name, price });
      if (response.data.success) {
        toast.success("Service added successfully!");
        setName("");
        setPrice("");
      } else {
        toast.error(response.data.message || "Failed to add service");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Add Service</h2>
      <input
        type="text"
        placeholder="Service Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <button onClick={handleAddService}>Add Service</button>
      <ToastContainer />
    </div>
  );
}
