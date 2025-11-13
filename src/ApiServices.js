import axios from "axios";

export const BaseUrl = "http://localhost:5000/";

// Attach token to every request automatically
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//Handle expired or invalid tokens globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Session expired! Please log in again.");
      sessionStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

class ApiServices {
  // ------------------- LOGIN APIS -------------------

  Login(data) {
    // Automatically detect which login API to call
    const path = window.location.pathname;

    if (path.includes("admin")) {
      return axios.post(`${BaseUrl}admin/login`, data);
    } else if (path.includes("vendor")) {
      return axios.post(`${BaseUrl}service/serviceProvider/login`, data);
    } else {
      return axios.post(`${BaseUrl}customer/login`, data);
    }
  }

  // ------------------- ADMIN CATEGORY -------------------
  AddCategory(data) {
    const isFormData = data instanceof FormData;
    return axios.post(`${BaseUrl}admin/category/add`, data, {
      headers: {
        ...(isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" }),
      },
    });
  }

  GetAllCategory() {
    return axios.post(`${BaseUrl}admin/category/all`);
  }

  GetSingleCategory(id) {
    return axios.post(`${BaseUrl}admin/category/getsingle`, { _id: id });
  }

  UpdateCategory(data) {
    return axios.post(`${BaseUrl}admin/category/update`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  DeleteCategory(data) {
    return axios.post(`${BaseUrl}admin/category/delete`, data);
  }

  DeactivateCategory(data) {
    return axios.post(`${BaseUrl}admin/category/deactivate`, data);
  }

  // ------------------- SUBCATEGORY APIS -------------------
  AddSubCategory(data) {
    return axios.post(`${BaseUrl}api/subcategory/add`, data);
  }

  AllSubCategory(data) {
    return axios.post(`${BaseUrl}api/subcategory/all`, data);
  }

  // ------------------- SERVICE PROVIDER (Vendor) -------------------
  addServiceProvider(data) {
    return axios.post(`${BaseUrl}service/serviceProvider/add`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  getAllProviders() {
    return axios.post(`${BaseUrl}service/serviceProvider/all`);
  }

  getSingleProvider(id) {
    return axios.post(`${BaseUrl}service/serviceProvider/single`, { id });
  }

  updateProvider(id, data) {
    return axios.post(`${BaseUrl}service/serviceProvider/update`, {
      id,
      ...data,
    });
  }

  changePassword(data) {
    return axios.post(`${BaseUrl}service/serviceProvider/changePassword`, data);
  }
changeVendorStatus(data) {
  return axios.post(`${BaseUrl}admin/serviceProvider/changeStatus`, data);
}
  // ------------------- SERVICES -------------------
  addService(data) {
    return axios.post(`${BaseUrl}service/service/add`, data);
  }

  getAllServices() {
    return axios.post(`${BaseUrl}service/service/all`);
  }

  getSingleService(id) {
    return axios.post(`${BaseUrl}service/service/single`, { id });
  }

  updateService(id, data) {
    return axios.post(`${BaseUrl}service/service/update`, { id, ...data });
  }

  deleteService(id) {
    return axios.post(`${BaseUrl}service/service/delete`, { id });
  }

  // ------------------- REVIEW -------------------
  GetAllReviews() {
    return axios.post(`${BaseUrl}api/review/all`);
  }

  GetSingleReview(data) {
    return axios.post(`${BaseUrl}api/review/single`, data);
  }

  UpdateReview(data) {
    return axios.post(`${BaseUrl}api/review/update`, data);
  }

  ChangeReviewStatus(data) {
    return axios.post(`${BaseUrl}api/review/changeStatus`, data);
  }

  // ------------------- REQUEST -------------------
  GetAllRequests() {
    return axios.post(`${BaseUrl}api/request/all`);
  }

  GetSingleRequest(data) {
    return axios.post(`${BaseUrl}api/request/single`, data);
  }

  UpdateRequest(data) {
    return axios.post(`${BaseUrl}api/request/update`, data);
  }

  ChangeRequestStatus(data) {
    return axios.post(`${BaseUrl}api/request/changestatus`, data);
  }

  GetRequestPagination(data) {
    return axios.post(`${BaseUrl}api/request/getpagination`, data);
  }

  // ------------------- CUSTOMER -------------------
  GetAllCustomer() {
    return axios.post(`${BaseUrl}api/customer/all`);
  }

  GetSingleCustomer(data) {
    return axios.post(`${BaseUrl}api/customer/single`, data);
  }

  UpdateCustomer(data) {
    return axios.post(`${BaseUrl}api/customer/update`, data);
  }

  ChangeCustomerStatus(data) {
    return axios.post(`${BaseUrl}api/customer/changeStatus`, data);
  }

  GetCustomerPagination(data) {
    return axios.post(`${BaseUrl}api/customer/getpagination`, data);
  }

  // ------------------- BOOKINGS -------------------
  GetAllBookings() {
    return axios.get(`${BaseUrl}booking/getall`);
  }
}

export default new ApiServices();
