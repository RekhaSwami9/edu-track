import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Schedule from "../pages/Schedule";
import Leave from "../pages/Leave";
import Substitution from "../pages/Substitution";
import MyAvailability from "../pages/MyAvailability";
import MyCredits from "../pages/MyCredits";
import RequestSubstitution from "../pages/RequestSubstitution";
import SubstitutionRequests from "../pages/SubstitutionRequests";
import MyProfile from "../pages/MyProfile";
import Layout from "../components/layout/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="leave" element={<Leave />} />
        <Route path="substitution" element={<Substitution />} />
        <Route path="my-availability" element={<MyAvailability />} />
        <Route path="my-credits" element={<MyCredits />} />
        <Route path="request-substitution" element={<RequestSubstitution />} />
        <Route
          path="substitution-requests"
          element={<SubstitutionRequests />}
        />
        <Route path="my-profile" element={<MyProfile />} />
      </Route>
    </Routes>
  );
}
