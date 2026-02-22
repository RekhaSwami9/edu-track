import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coins,
  PlusCircle,
  Inbox,
  User,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [hovered, setHovered] = useState(false);
  const isExpanded = !collapsed || hovered;

  return (
    <aside
      className={`sidebar ${isExpanded ? "" : "collapsed"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div className="sidebar-header">
        <span className="logo-text">EduTrack</span>

        <button
          className={`collapse-btn ${isExpanded ? "expanded" : "collapsed"}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        <NavLink to="/" className="menu-item" data-tooltip="Dashboard">
          <span className="active-indicator" />
          <LayoutDashboard size={18} />
          <span className="menu-text">Dashboard</span>
        </NavLink>

        <NavLink to="/schedule" className="menu-item" data-tooltip="Schedule">
          <span className="active-indicator" />
          <Calendar size={18} />
          <span className="menu-text">Schedule</span>
        </NavLink>

        <NavLink to="/leave" className="menu-item" data-tooltip="Leave">
          <span className="active-indicator" />
          <FileText size={18} />
          <span className="menu-text">Leave</span>
        </NavLink>

        <NavLink
          to="/my-availability"
          className="menu-item"
          data-tooltip="My Availability"
        >
          <span className="active-indicator" />
          <Clock size={18} />
          <span className="menu-text">My Availability</span>
        </NavLink>

        <NavLink
          to="/my-credits"
          className="menu-item"
          data-tooltip="My Credits"
        >
          <span className="active-indicator" />
          <Coins size={18} />
          <span className="menu-text">My Credits</span>
        </NavLink>

        <NavLink
          to="/request-substitution"
          className="menu-item"
          data-tooltip="Request Substitution"
        >
          <span className="active-indicator" />
          <PlusCircle size={18} />
          <span className="menu-text">Request Substitution</span>
        </NavLink>

        <NavLink
          to="/substitution-requests"
          className="menu-item"
          data-tooltip="Substitution Requests"
        >
          <span className="active-indicator" />
          <Inbox size={18} />
          <span className="menu-text">Substitution Requests</span>
        </NavLink>

        <NavLink
          to="/my-profile"
          className="menu-item"
          data-tooltip="My Profile"
        >
          <span className="active-indicator" />
          <User size={18} />
          <span className="menu-text">My Profile</span>
        </NavLink>
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <NavLink to="/settings" className="menu-item" data-tooltip="Settings">
          <Settings size={18} />
          <span className="menu-text">Settings</span>
        </NavLink>

        <button className="logout-btn" data-tooltip="Logout">
          <LogOut size={18} />
          <span className="menu-text">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
