import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layouts
import Master from "./layout/Master";
import AdminMaster from "./admin/layout/AdminMaster";

// Components
import Corosel from "./components/Corosel";
import About from "./components/About";
import Services from "./components/Services";
import Fact from "./components/Fact";
import Booking from "./components/Booking";
import Team from "./components/Team";
import Testimonial from "./components/Testimonial";
import Register from "./components/Register";
import Login from "./components/Login";

// Admin Components
import Dashboard from "./admin/components/Dashboard";
import AddCategory from "./admin/category/AddCategory";
import ViewCategories from "./admin/category/ViewCategories";
import UpdateCategory from "./admin/category/UpdateCategory";
import ViewCustomer from "./admin/customer/ViewCustomer";
import SingleCustomer from "./admin/customer/SingleCustomer";
import UpdateCustomer from "./admin/customer/UpdateCustomer";
import ViewRequest from "./admin/request/ViewRequest";
import UpdateRequest from "./admin/request/UpdateRequest";
import ViewReviews from "./admin/review/ViewReviews";
import UpdateReview from "./admin/review/UpdateReview";
import AddService from "./admin/service/AddService";
import ViewServices from "./admin/service/ViewServices";
import UpdateService from "./admin/service/UpdateService";
import ViewVendors from "./admin/vendor/components/ViewVendors";
import ViewSingleVendor from "./admin/vendor/components/ViewSingleVendor";
import VendorMaster from "./vendor/layout/VendorMaster";
import VendorDashboard from "./vendor/components/VendorDashboard";
import CustomerMaster from "./customer/layout/CustomerMaster";
import CustomerDashboard from "./customer/components/CustomerDashboard";
import CustomerRegister from "./customer/components/CustomerRegister";
import VendorRegistration from "./vendor/components/VendorRegistration";
import AddServices from "./vendor/components/AddServices";
import ServiceProviderChangePassword from "./vendor/components/ServiceProviderChangePassword";
import MyServices from "./vendor/components/MyServices";
import AllProviders from "./vendor/components/AllProviders";
import AdminViewVendors from "./admin/components/AdminViewVendors";
import VendorBookings from "./vendor/components/VendorBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ------------- Main Site ------------- */}
        <Route path="/" element={<Master />}>
          <Route index element={<Corosel />} />
          <Route path="about" element={<About />} />
          <Route path="service" element={<Services />} />
          <Route path="fact" element={<Fact />} />
          <Route path="booking" element={<Booking />} />
          <Route path="team" element={<Team />} />
          <Route path="testimonial" element={<Testimonial />} />
          <Route path="register" element={<Register />} />
          {/*  Dynamic login for all roles */}
          <Route path="login" element={<Login />} />
        </Route>

        {/* ------------- Admin Panel ------------- */}
        <Route path="/admin" element={<AdminMaster />}>
          <Route index element={<Dashboard />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="viewcategories" element={<ViewCategories />} />
          <Route path="updatecategory/:id" element={<UpdateCategory />} />
          <Route path="viewcustomer" element={<ViewCustomer />} />
          <Route path="singlecustomer/:id" element={<SingleCustomer />} />
          <Route path="updatecustomer/:id" element={<UpdateCustomer />} />
          <Route path="viewrequest" element={<ViewRequest />} />
          <Route path="updaterequest/:id" element={<UpdateRequest />} />
          <Route path="viewreviews" element={<ViewReviews />} />
          <Route path="updatereview/:id" element={<UpdateReview />} />
          <Route path="addservice" element={<AddService />} />
          <Route path="viewservices" element={<ViewServices />} />
          <Route path="updateservice/:id" element={<UpdateService />} />
          <Route path="vendor/:id" element={<ViewSingleVendor />} />
          {/* Vendor Management Routes */}
            <Route path="/admin/viewvendors" element={<AdminViewVendors />} />

        </Route>

        {/* ------------- Vendor Panel ------------- */}
        <Route path="/vendor" element={<VendorMaster />}>
          <Route index element={<VendorDashboard />} />
            <Route path="myservices" element={<MyServices />} />
          <Route path="add-service" element={<AddServices />} />
          <Route path="booking" element={<VendorBookings />} />
          
          <Route path="profile" element={<AllProviders />} />
          <Route path="change-password" element={<ServiceProviderChangePassword />} />
        </Route>

        {/* ------------- Customer Panel ------------- */}
        <Route path="/customer" element={<CustomerMaster />}>
          <Route index element={<CustomerDashboard />} />
        </Route>
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/vendor-register" element={<VendorRegistration />} />


        {/* ------------- 404 Page ------------- */}
        <Route
          path="*"
          element={<h2 className="text-center mt-5">Page Not Found</h2>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
