import React from 'react'

function Topbar() {
  return (
    <div>
      <>
  {/* Topbar Start */}
  <div className="container-fluid bg-light d-none d-lg-block">
    <div className="row align-items-center top-bar">
      <div className="col-lg-3 col-md-12 text-center text-lg-start">
        <a href="" className="navbar-brand m-0 p-0">
          <h1 className="text-primary m-0">Plumberz</h1>
        </a>
      </div>
      <div className="col-lg-9 col-md-12 text-end">
        <div className="h-100 d-inline-flex align-items-center me-4">
          <i className="fa fa-map-marker-alt text-primary me-2" />
          <p className="m-0">123 Street, New York, USA</p>
        </div>
        <div className="h-100 d-inline-flex align-items-center me-4">
          <i className="far fa-envelope-open text-primary me-2" />
          <p className="m-0">info@example.com</p>
        </div>
        <div className="h-100 d-inline-flex align-items-center">
          <a className="btn btn-sm-square bg-white text-primary me-1" href="">
            <i className="fab fa-facebook-f" />
          </a>
          <a className="btn btn-sm-square bg-white text-primary me-1" href="">
            <i className="fab fa-twitter" />
          </a>
          <a className="btn btn-sm-square bg-white text-primary me-1" href="">
            <i className="fab fa-linkedin-in" />
          </a>
          <a className="btn btn-sm-square bg-white text-primary me-0" href="">
            <i className="fab fa-instagram" />
          </a>
        </div>
      </div>
    </div>
  </div>
  {/* Topbar End */}
</>

    </div>
  )
}

export default Topbar
