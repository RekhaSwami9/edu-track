import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, X, Calendar, FileText, Clock, AlertCircle } from "lucide-react";
import "./Navbar.css";

const breadcrumbMap = {
  "/": "Dashboard",
  "/schedule": "Schedule",
  "/leave": "Leave",
  "/substitution": "Substitution",
  "/settings": "Settings",
  "/my-availability": "My Availability",
  "/my-credits": "My Credits",
  "/request-substitution": "Request Substitution",
  "/substitution-requests": "Substitution Requests",
  "/my-profile": "My Profile",
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: "sick",
    startDate: "",
    endDate: "",
    reason: "",
    isUrgent: false,
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const current = breadcrumbMap[path] || "Dashboard";

  const handleLeaveChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLeaveForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus("Submitting...");

    // Simulate API call
    setTimeout(() => {
      setSubmitStatus("Leave request submitted successfully!");
      setTimeout(() => {
        setShowLeaveModal(false);
        setSubmitStatus("");
        setLeaveForm({
          type: "sick",
          startDate: "",
          endDate: "",
          reason: "",
          isUrgent: false,
        });
        // Navigate to leave page to see the request
        navigate("/leave");
      }, 1500);
    }, 1000);
  };

  const getLeaveTypeIcon = (type) => {
    switch (type) {
      case "sick":
        return <AlertCircle size={16} />;
      case "vacation":
        return <Calendar size={16} />;
      case "personal":
        return <FileText size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <p className="breadcrumb">
            <span className="breadcrumb-root">Home</span>
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

        <div className="navbar-right">
          <button
            className="leave-plus-btn"
            onClick={() => setShowLeaveModal(true)}
          >
            <Plus size={18} />
            <span>Leave</span>
          </button>
        </div>
      </header>

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="modal-overlay" onClick={() => setShowLeaveModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Request Leave</h3>
              <button
                className="modal-close"
                onClick={() => setShowLeaveModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleLeaveSubmit} className="leave-form">
              <div className="form-group">
                <label>Leave Type</label>
                <div className="leave-type-options">
                  {["sick", "vacation", "personal", "other"].map((type) => (
                    <label
                      key={type}
                      className={`leave-type-option ${
                        leaveForm.type === type ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={leaveForm.type === type}
                        onChange={handleLeaveChange}
                      />
                      {getLeaveTypeIcon(type)}
                      <span>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={leaveForm.startDate}
                    onChange={handleLeaveChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={leaveForm.endDate}
                    onChange={handleLeaveChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Reason</label>
                <textarea
                  name="reason"
                  rows="3"
                  value={leaveForm.reason}
                  onChange={handleLeaveChange}
                  placeholder="Please provide a reason for your leave request..."
                  required
                />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isUrgent"
                    checked={leaveForm.isUrgent}
                    onChange={handleLeaveChange}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">Mark as urgent</span>
                </label>
              </div>

              {submitStatus && (
                <div
                  className={`submit-status ${
                    submitStatus.includes("success") ? "success" : "pending"
                  }`}
                >
                  {submitStatus}
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowLeaveModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
