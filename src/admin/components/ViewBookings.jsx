import { useEffect, useState } from "react";
import PageHeader from "../../PageHeader";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import ApiServices from "../../ApiServices";
import { BarLoader } from "react-spinners";

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch bookings from API
  useEffect(() => {
    setLoading(true);
    ApiServices.GetAllBookings()
      .then((res) => {
        console.log("Bookings response:", res.data);
        if (res.data.success) {
          setBookings(res.data.data);
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        toast.error("Failed to fetch bookings");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <main className="main">
        {/* Page Header */}
        <PageHeader child={"View Bookings"} />

        <section id="bookings" className="section about-us">
          <div className="container">
            <ToastContainer />
            <BarLoader cssOverride={{ marginLeft: "45%" }} loading={loading} />

            {!loading && (
              <div className="row gy-4">
                <div className="offset-md-1 col-md-10 shadow p-4">
                  <table className="table table-bordered table-striped">
                    <thead className="table-primary text-center">
                      <tr>
                        <th>Sr No</th>
                        <th>Customer ID</th>
                        <th>Vendor ID</th>
                        <th>Category ID</th>
                        <th>Service ID</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center text-muted">
                            No bookings found
                          </td>
                        </tr>
                      ) : (
                        bookings.map((booking, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{booking.customer_id}</td>
                            <td>{booking.vendor_id}</td>
                            <td>{booking.category_id}</td>
                            <td>{booking.service_id}</td>
                            <td>
                              {new Date(booking.createdAt).toLocaleString()}
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  booking.status === "Completed"
                                    ? "bg-success"
                                    : booking.status === "Pending"
                                    ? "bg-warning"
                                    : "bg-secondary"
                                }`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td>
                              <Link className="btn btn-info btn-sm me-2">
                                View
                              </Link>
                              <Link className="btn btn-danger btn-sm">
                                Delete
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
