import React from 'react'

function Booking() {
  return (
    <div>
      <>
  {/* Booking Start */}
  <div className="container-fluid my-5 px-0">
    <div className="video wow fadeInUp" data-wow-delay="0.1s">
      <button
        type="button"
        className="btn-play"
        data-bs-toggle="modal"
        data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
        data-bs-target="#videoModal"
      >
        <span />
      </button>
      <div
        className="modal fade"
        id="videoModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Youtube Video
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/* 16:9 aspect ratio */}
              <div className="ratio ratio-16x9">
                <iframe
                  className="embed-responsive-item"
                  src=""
                  id="video"
                  allowFullScreen=""
                  allowscriptaccess="always"
                  allow="autoplay"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-white mb-4">Emergency Plumbing Service</h1>
      <h3 className="text-white mb-0">24 Hours 7 Days a Week</h3>
    </div>
    <div
      className="container position-relative wow fadeInUp"
      data-wow-delay="0.1s"
      style={{ marginTop: "-6rem" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="bg-light text-center p-5">
            <h1 className="mb-4">Book For A Service</h1>
            <form>
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Your Name"
                    style={{ height: 55 }}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    type="email"
                    className="form-control border-0"
                    placeholder="Your Email"
                    style={{ height: 55 }}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <select
                    className="form-select border-0"
                    style={{ height: 55 }}
                  >
                    <option selected="">Select A Service</option>
                    <option value={1}>Service 1</option>
                    <option value={2}>Service 2</option>
                    <option value={3}>Service 3</option>
                  </select>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="date" id="date1" data-target-input="nearest">
                    <input
                      type="text"
                      className="form-control border-0 datetimepicker-input"
                      placeholder="Service Date"
                      data-target="#date1"
                      data-toggle="datetimepicker"
                      style={{ height: 55 }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control border-0"
                    placeholder="Special Request"
                    defaultValue={""}
                  />
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100 py-3" type="submit">
                    Book Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Booking End */}
</>

    </div>
  )
}

export default Booking
