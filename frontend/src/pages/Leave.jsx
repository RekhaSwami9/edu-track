import { useState } from "react";
import "./Leave.css";

const Leave = () => {
  const [formData, setFormData] = useState({
    leaveType: "casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [showForm, setShowForm] = useState(false);

  // Dummy leave data
  const leaveBalance = {
    casual: 12,
    medical: 15,
    earned: 20,
    maternity: 0,
  };

  const leaveHistory = [
    {
      id: 1,
      type: "Casual Leave",
      startDate: "2026-01-15",
      endDate: "2026-01-16",
      days: 2,
      reason: "Family function",
      status: "approved",
      appliedOn: "2026-01-10",
    },
    {
      id: 2,
      type: "Medical Leave",
      startDate: "2026-02-05",
      endDate: "2026-02-07",
      days: 3,
      reason: "Fever and cold",
      status: "approved",
      appliedOn: "2026-02-04",
    },
    {
      id: 3,
      type: "Casual Leave",
      startDate: "2026-02-20",
      endDate: "2026-02-20",
      days: 1,
      reason: "Personal work",
      status: "pending",
      appliedOn: "2026-02-18",
    },
    {
      id: 4,
      type: "Earned Leave",
      startDate: "2025-12-25",
      endDate: "2025-12-30",
      days: 6,
      reason: "Vacation",
      status: "approved",
      appliedOn: "2025-12-15",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Leave Application Submitted!\n\nType: ${formData.leaveType}\nFrom: ${formData.startDate}\nTo: ${formData.endDate}\nReason: ${formData.reason}`,
    );
    setShowForm(false);
    setFormData({
      leaveType: "casual",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  const handleCancel = (id) => {
    alert(`Leave application #${id} cancelled successfully!`);
  };

  const handleViewDetails = (leave) => {
    alert(
      `Leave Details:\n\nType: ${leave.type}\nDates: ${leave.startDate} to ${leave.endDate}\nDays: ${leave.days}\nReason: ${leave.reason}\nStatus: ${leave.status.toUpperCase()}`,
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "status-approved";
      case "pending":
        return "status-pending";
      case "rejected":
        return "status-rejected";
      default:
        return "";
    }
  };

  return (
    <div className="leave-page">
      <div className="leave-header">
        <h2>Leave Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Apply for Leave"}
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="leave-balance-grid">
        <div className="balance-card">
          <h4>Casual Leave</h4>
          <div className="balance-number">{leaveBalance.casual}</div>
          <p>days available</p>
        </div>
        <div className="balance-card">
          <h4>Medical Leave</h4>
          <div className="balance-number">{leaveBalance.medical}</div>
          <p>days available</p>
        </div>
        <div className="balance-card">
          <h4>Earned Leave</h4>
          <div className="balance-number">{leaveBalance.earned}</div>
          <p>days available</p>
        </div>
        <div className="balance-card">
          <h4>Maternity Leave</h4>
          <div className="balance-number">{leaveBalance.maternity}</div>
          <p>days available</p>
        </div>
      </div>

      {/* Leave Application Form */}
      {showForm && (
        <div className="leave-form-container">
          <h3>Apply for Leave</h3>
          <form onSubmit={handleSubmit} className="leave-form">
            <div className="form-row">
              <div className="form-group">
                <label>Leave Type</label>
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="casual">Casual Leave</option>
                  <option value="medical">Medical Leave</option>
                  <option value="earned">Earned Leave</option>
                  <option value="maternity">Maternity Leave</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Enter reason for leave..."
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leave History */}
      <div className="leave-history">
        <h3>Leave History</h3>
        <div className="history-table-container">
          <table className="leave-table">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Applied On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.type}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.days}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.appliedOn}</td>
                  <td>
                    <span
                      className={`status-badge ${getStatusClass(leave.status)}`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon"
                        onClick={() => handleViewDetails(leave)}
                        title="View Details"
                      >
                        👁
                      </button>
                      {leave.status === "pending" && (
                        <button
                          className="btn-icon cancel"
                          onClick={() => handleCancel(leave.id)}
                          title="Cancel"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leave;
