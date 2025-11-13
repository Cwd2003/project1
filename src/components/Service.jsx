import React from 'react'

function Service() {
  return (
    <div>
      <>
  {/* Service Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-4">
        <div
          className="col-lg-4 col-md-6 service-item-top wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div className="overflow-hidden">
            <img
              className="img-fluid w-100 h-100"
              src="/public/assets/img/service-1.jpg"
              alt=""
            />
          </div>
          <div className="d-flex align-items-center justify-content-between bg-light p-4">
            <h5 className="text-truncate me-3 mb-0">Residential Plumbing</h5>
            <a
              className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0"
              href=""
            >
              <i className="fa fa-arrow-right" />
            </a>
          </div>
        </div>
        <div
          className="col-lg-4 col-md-6 service-item-top wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div className="overflow-hidden">
            <img
              className="img-fluid w-100 h-100"
              src="/public/assets/img/service-2.jpg"
              alt=""
            />
          </div>
          <div className="d-flex align-items-center justify-content-between bg-light p-4">
            <h5 className="text-truncate me-3 mb-0">Commercial Plumbing</h5>
            <a
              className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0"
              href=""
            >
              <i className="fa fa-arrow-right" />
            </a>
          </div>
        </div>
        <div
          className="col-lg-4 col-md-6 service-item-top wow fadeInUp"
          data-wow-delay="0.5s"
        >
          <div className="overflow-hidden">
            <img
              className="img-fluid w-100 h-100"
              src="/public/assets/img/service-3.jpg"
              alt=""
            />
          </div>
          <div className="d-flex align-items-center justify-content-between bg-light p-4">
            <h5 className="text-truncate me-3 mb-0">Emergency Servicing</h5>
            <a
              className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0"
              href=""
            >
              <i className="fa fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Service End */}
</>

    </div>
  )
}

export default Service
