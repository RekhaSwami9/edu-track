import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Schedule from "../pages/Schedule";
import Leave from "../pages/Leave";
import Substitution from "../pages/Substitution";
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
      </Route>
    </Routes>
  );
}
