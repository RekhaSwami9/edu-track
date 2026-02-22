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
          to="/substitution"
          className="menu-item"
          data-tooltip="Substitution"
        >
          <span className="active-indicator" />
          <Users size={18} />
          <span className="menu-text">Substitution</span>
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
