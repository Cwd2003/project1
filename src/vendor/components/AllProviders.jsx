import React, { useEffect, useState } from "react";
import ApiServices from "../../ApiServices";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

function AllProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await ApiServices.getAllProviders(); 
      if (res.data.success) {
        setProviders(res.data.data || []);
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to fetch providers", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">All Service Providers</h2>

      {loading ? (
        <div className="text-center">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover fw-bold">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Provider Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service Type</th>
              </tr>
            </thead>
            <tbody>
              {providers.length > 0 ? (
                providers.map((p, index) => (
                  <tr key={p._id}>
                    <td>{index + 1}</td>
                    <td>{p.name}</td>
                    <td>{p.email}</td>
                    <td>{p.phone}</td>
                    <td>{p.serviceType}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No providers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllProviders;
