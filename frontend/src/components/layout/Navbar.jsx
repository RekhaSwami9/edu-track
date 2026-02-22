import { useLocation } from "react-router-dom";
import "./Navbar.css";

const breadcrumbMap = {
  "/": "Dashboard",
  "/schedule": "Schedule",
  "/leave": "Leave",
  "/substitution": "Substitution",
  "/settings": "Settings",
};

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const current = breadcrumbMap[path] || "Dashboard";

  return (
    <header className="navbar">
      <div className="navbar-left">
        <p className="breadcrumb">
          <span className="breadcrumb-root"></span>
          {path !== "/" && (
            <>
              <span className="breadcrumb-separator"> / </span>
              <span className="breadcrumb-current">{current}</span>
            </>
          )}
        </p>

        <h2 className="navbar-title">{current}</h2>
        <p className="navbar-subtitle">Welcome back, Dr. Morgan 👋</p>
      </div>
    </header>
  );
};

export default Navbar;
