import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function CustomerMaster() {
  return (
    <div>
      <nav style={{ background: "green", padding: "10px" }}>
        <Link to="/customer" style={{ color: "white", marginRight: "15px" }}>Customer Dashboard</Link>
        <Link to="/customer/profile" style={{ color: "white" }}>Profile</Link>
      </nav>
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
