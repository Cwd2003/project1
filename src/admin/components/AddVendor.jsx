import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ApiServices from "../../ApiServices";
import "react-toastify/dist/ReactToastify.css";

export default function AddVendor() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleAddVendor = async () => {
    if (!name || !contact) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const response = await ApiServices.AddVendor({ name, contact });
      if (response.data.success) {
        toast.success("Vendor added successfully!");
        setName("");
        setContact("");
      } else {
        toast.error(response.data.message || "Failed to add vendor");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Add Vendor</h2>
      <input
        type="text"
        placeholder="Vendor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <input
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <button onClick={handleAddVendor}>Add Vendor</button>
      <ToastContainer />
    </div>
  );
}
