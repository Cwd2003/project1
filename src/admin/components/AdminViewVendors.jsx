import React, { useEffect, useState } from "react";
import ApiServices from "../../ApiServices";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AdminViewVendors = () => {
    const [vendors, setVendors] = useState([]);
    const [loadingId, setLoadingId] = useState(null); // 👈 Track which vendor is being updated

    // 🧭 Fetch all vendors
    const fetchVendors = async () => {
        try {
            const res = await ApiServices.getAllProviders();
            if (res.data.success) {
                setVendors(res.data.data);
            } else {
                toast.error("Failed to load vendors!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error fetching vendors!");
        }
    };

    // 🟢 Toggle vendor status with confirmation
  const handleStatusChange = async (vendor) => {
  const newStatus = !vendor.status;

  const result = await Swal.fire({
    title: `Are you sure you want to ${newStatus ? "activate" : "deactivate"} this vendor?`,
    text: `${vendor.name} will be ${newStatus ? "activated" : "deactivated"}.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: newStatus ? "#28a745" : "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: `Yes, ${newStatus ? "activate" : "deactivate"}!`,
  });

  if (result.isConfirmed) {
    try {
      setLoadingId(vendor._id);
      const payload = { _id: vendor._id, status: newStatus };
      console.log("Payload sent:", payload);

      const res = await ApiServices.changeVendorStatus(payload);
      console.log("Response from backend:", res.data);

      if (res.data.success || res.data.status) {
        Swal.fire("Updated!", `Vendor ${vendor.name} ${newStatus ? "activated" : "deactivated"} successfully.`, "success");
        fetchVendors();
      } else {
        toast.error(res.data.message || "Failed to update vendor status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating vendor status!");
    } finally {
      setLoadingId(null);
    }
  }
};

    useEffect(() => {
        fetchVendors();
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Manage Vendors</h3>
            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Auto ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Address</th>
                            <th>Description</th>
                            <th>Experience</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {vendors.length > 0 ? (
                            vendors.map((vendor) => (
                                <tr key={vendor._id}>
                                    <td>{vendor.autoId}</td>
                                    <td>{vendor.name}</td>
                                    <td>{vendor.email}</td>
                                    <td>{vendor.contact}</td>
                                    <td>{vendor.address}</td>
                                    <td>{vendor.description}</td>
                                    <td>{vendor.experience}</td>
                                    <td>
                                        <img
                                            src={vendor.image}
                                            alt="Vendor"
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${vendor.status ? "bg-success" : "bg-danger"
                                                }`}
                                        >
                                            {vendor.status ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${vendor.status ? "btn-danger" : "btn-success"
                                                }`}
                                            onClick={() => handleStatusChange(vendor)}
                                            disabled={loadingId === vendor._id}
                                        >
                                            {loadingId === vendor._id ? (
                                                <span
                                                    className="spinner-border spinner-border-sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                            ) : vendor.status ? (
                                                "Deactivate"
                                            ) : (
                                                "Activate"
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10">No Vendors Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminViewVendors;
