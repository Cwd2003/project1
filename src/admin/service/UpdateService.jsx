import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ApiServices from "../../ApiServices";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateService() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await ApiServices.GetSingleService({ id });
        if (response.data.success && response.data.service) {
          setName(response.data.service.name);
          setPrice(response.data.service.price);
        } else {
          toast.error("Failed to fetch service data");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching service");
        console.error(error);
      }
    };
    fetchService();
  }, [id]);

  const handleUpdateService = async () => {
    if (!name || !price) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const response = await ApiServices.UpdateService({ id, name, price });
      if (response.data.success) {
        toast.success("Service updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update service");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Update Service</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Service Name"
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <button onClick={handleUpdateService}>Update Service</button>
      <ToastContainer />
    </div>
  );
}
