import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth APIs
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const registerUser = (data) => API.post("/auth/register", data);
export const getCurrentUser = () => API.get("/auth/me");
export const updateProfile = (data) => API.put("/auth/profile", data);
export const changePassword = (data) => API.put("/auth/change-password", data);

// Availability APIs
export const getAvailability = (facultyId) =>
  API.get(`/availability/${facultyId}`);
export const updateAvailability = (facultyId, data) =>
  API.put(`/availability/${facultyId}`, data);
export const toggleAvailabilityStatus = (facultyId) =>
  API.patch(`/availability/${facultyId}/toggle`);
export const findAvailableFaculties = (params) =>
  API.get("/availability/find/available", { params });

// Credit APIs
export const getCreditBalance = (facultyId) =>
  API.get(`/credits/balance/${facultyId}`);
export const getTransactionHistory = (facultyId, params) =>
  API.get(`/credits/transactions/${facultyId}`, { params });
export const getCreditStats = (facultyId) =>
  API.get(`/credits/stats/${facultyId}`);
export const getLeaderboard = (params) =>
  API.get("/credits/leaderboard", { params });

// Substitution APIs
export const requestSubstitution = (data) =>
  API.post("/substitution/request", data);
export const getMySubstitutionRequests = (params) =>
  API.get("/substitution/my-requests", { params });
export const getMySubstitutions = (params) =>
  API.get("/substitution/my-substitutions", { params });
export const getPendingNotifications = () =>
  API.get("/substitution/notifications");
export const acceptSubstitution = (id) =>
  API.post(`/substitution/${id}/accept`);
export const declineSubstitution = (id) =>
  API.post(`/substitution/${id}/decline`);
export const completeSubstitution = (id) =>
  API.post(`/substitution/${id}/complete`);
export const cancelSubstitution = (id) =>
  API.post(`/substitution/${id}/cancel`);
export const getSubstitutionStats = (params) =>
  API.get("/substitution/stats", { params });

export default API;
