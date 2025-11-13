import PageHeader from "../../PageHeader";

export default function Dashboard() {
  return (
    <>
      <main className="main">
        {/* Page Title */}
        <PageHeader child={"Dashboard Page"} />
        {/* End Page Title */}

        {/* Admin Dashboard Section */}
        <section id="dashboard" className="section about-us">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 order-1 order-lg-2">
                <img
                  src="/public/assets/img/Admin.png"
                  className="img-fluid"
                  alt="Admin Dashboard"
                />
              </div>

              <div className="col-lg-6 order-2 order-lg-1 content">
                <h3>Welcome to Admin Dashboard</h3>
                <p className="fst-italic">
                  The Admin Panel of the <b>Home Services Management System</b> provides 
                  complete control over users, vendors, and services. 
                  It ensures smooth coordination between customers and service providers.
                </p>

                <ul>
                  <li>
                    <i className="bi bi-check-circle" />{" "}
                    <span>
                      Monitor and manage all registered <b>Customers</b> and <b>Vendors</b> in one place.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle" />{" "}
                    <span>
                      Add, edit, or remove <b>Service Categories</b> such as Plumbing, 
                      Electrician, Cleaning, or Barber.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle" />{" "}
                    <span>
                      View and handle <b>Booking Requests</b>, verify vendor availability,
                      and ensure timely service delivery.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle" />{" "}
                    <span>
                      Review customer feedback and maintain service quality and system reliability.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle" />{" "}
                    <span>
                      Oversee real-time system updates and generate reports for efficient management.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
    
      </main>
    </>
  );
}
