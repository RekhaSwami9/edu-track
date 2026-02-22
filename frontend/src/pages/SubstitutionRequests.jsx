import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  BookOpen,
  AlertCircle,
  CheckSquare,
  XSquare,
  RotateCcw,
} from "lucide-react";
import "./SubstitutionRequests.css";

// Dummy data
const dummyIncomingRequests = [
  {
    _id: "101",
    requestingFaculty: { name: "Prof. James Wilson", department: "IT" },
    subject: "Web Development",
    className: "CS-401",
    date: "2026-02-18",
    startTime: "11:00",
    endTime: "12:00",
    status: "pending",
    notes: "Urgent meeting with client",
  },
  {
    _id: "102",
    requestingFaculty: { name: "Dr. Amanda Martinez", department: "CS" },
    subject: "Database Systems",
    className: "CS-205",
    date: "2026-02-22",
    startTime: "14:00",
    endTime: "15:00",
    status: "pending",
    notes: "Conference presentation",
  },
];

const dummyMyRequests = [
  {
    _id: "201",
    subject: "Data Structures",
    className: "CS-201",
    date: "2026-02-15",
    startTime: "10:00",
    endTime: "11:00",
    status: "accepted",
    substitutingFaculty: { name: "Dr. Sarah Johnson" },
    creditsUsed: 0,
  },
  {
    _id: "202",
    subject: "Algorithms",
    className: "CS-301",
    date: "2026-02-20",
    startTime: "14:00",
    endTime: "15:30",
    status: "pending",
    substitutingFaculty: null,
    creditsUsed: 2,
  },
  {
    _id: "203",
    subject: "Operating Systems",
    className: "CS-304",
    date: "2026-01-25",
    startTime: "09:00",
    endTime: "10:00",
    status: "completed",
    substitutingFaculty: { name: "Dr. Emily Williams" },
    creditsUsed: 0,
  },
];

const dummyMySubstitutions = [
  {
    _id: "301",
    requestingFaculty: { name: "Prof. Michael Chen", department: "CS" },
    subject: "Software Engineering",
    className: "CS-305",
    date: "2026-02-10",
    startTime: "10:00",
    endTime: "12:00",
    status: "completed",
  },
  {
    _id: "302",
    requestingFaculty: { name: "Dr. Lisa Anderson", department: "DS" },
    subject: "Machine Learning",
    className: "CS-501",
    date: "2026-02-14",
    startTime: "14:00",
    endTime: "15:30",
    status: "accepted",
  },
];

const SubstitutionRequests = () => {
  const [activeTab, setActiveTab] = useState("incoming");
  const [incomingRequests, setIncomingRequests] = useState(
    dummyIncomingRequests,
  );
  const [myRequests, setMyRequests] = useState(dummyMyRequests);
  const [mySubstitutions, setMySubstitutions] = useState(dummyMySubstitutions);
  const [loading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleAccept = (id) => {
    setActionLoading(id);
    setTimeout(() => {
      setIncomingRequests((prev) => prev.filter((req) => req._id !== id));
      setMessage({
        type: "success",
        text: "Request accepted! +1 credit earned (dummy)",
      });
      setActionLoading(null);
    }, 500);
  };

  const handleDecline = (id) => {
    setActionLoading(id);
    setTimeout(() => {
      setIncomingRequests((prev) => prev.filter((req) => req._id !== id));
      setMessage({ type: "info", text: "Request declined (dummy)" });
      setActionLoading(null);
    }, 500);
  };

  const handleComplete = (id) => {
    setActionLoading(id);
    setTimeout(() => {
      setMySubstitutions((prev) =>
        prev.map((sub) =>
          sub._id === id ? { ...sub, status: "completed" } : sub,
        ),
      );
      setMyRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "completed" } : req,
        ),
      );
      setMessage({
        type: "success",
        text: "Substitution marked as completed! (dummy)",
      });
      setActionLoading(null);
    }, 500);
  };

  const handleCancel = (id) => {
    setActionLoading(id);
    setTimeout(() => {
      setMyRequests((prev) => prev.filter((req) => req._id !== id));
      setMessage({
        type: "success",
        text: "Request cancelled successfully (dummy)",
      });
      setActionLoading(null);
    }, 500);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "status-pending", icon: <Clock size={14} /> },
      notified: { class: "status-notified", icon: <AlertCircle size={14} /> },
      accepted: { class: "status-accepted", icon: <CheckCircle size={14} /> },
      completed: { class: "status-completed", icon: <CheckSquare size={14} /> },
      declined: { class: "status-declined", icon: <XCircle size={14} /> },
      cancelled: { class: "status-cancelled", icon: <XSquare size={14} /> },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`status-badge ${config.class}`}>
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="substitution-requests">
      <div className="requests-header">
        <h1>Substitution Requests</h1>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          <AlertCircle size={18} />
          {message.text}
        </div>
      )}

      <div className="tabs">
        <button
          className={`tab ${activeTab === "incoming" ? "active" : ""}`}
          onClick={() => setActiveTab("incoming")}
        >
          Incoming Requests
          {incomingRequests.length > 0 && (
            <span className="badge">{incomingRequests.length}</span>
          )}
        </button>
        <button
          className={`tab ${activeTab === "my-requests" ? "active" : ""}`}
          onClick={() => setActiveTab("my-requests")}
        >
          My Requests
        </button>
        <button
          className={`tab ${activeTab === "my-substitutions" ? "active" : ""}`}
          onClick={() => setActiveTab("my-substitutions")}
        >
          My Substitutions
        </button>
      </div>

      {/* Incoming Requests Tab */}
      {activeTab === "incoming" && (
        <div className="requests-list">
          {incomingRequests.length === 0 ? (
            <div className="empty-state">
              <CheckCircle size={48} className="empty-icon" />
              <h3>No Pending Requests</h3>
              <p>
                You don't have any incoming substitution requests at the moment.
              </p>
            </div>
          ) : (
            incomingRequests.map((request) => (
              <div key={request._id} className="request-card incoming">
                <div className="request-header-card">
                  <div className="requester-info">
                    <div className="avatar">
                      {request.requestingFaculty.name.charAt(0)}
                    </div>
                    <div>
                      <h4>{request.requestingFaculty.name}</h4>
                      <p>{request.requestingFaculty.department}</p>
                    </div>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

                <div className="request-details">
                  <div className="detail-item">
                    <BookOpen size={16} />
                    <span>
                      <strong>{request.subject}</strong> - {request.className}
                    </span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>{formatDate(request.date)}</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={16} />
                    <span>
                      {request.startTime} - {request.endTime}
                    </span>
                  </div>
                </div>

                {request.notes && (
                  <div className="request-notes">
                    <p>{request.notes}</p>
                  </div>
                )}

                <div className="request-actions">
                  <button
                    className="accept-btn"
                    onClick={() => handleAccept(request._id)}
                    disabled={actionLoading === request._id}
                  >
                    <CheckCircle size={18} />
                    {actionLoading === request._id
                      ? "Processing..."
                      : "Accept (+1 Credit)"}
                  </button>
                  <button
                    className="decline-btn"
                    onClick={() => handleDecline(request._id)}
                    disabled={actionLoading === request._id}
                  >
                    <XCircle size={18} />
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* My Requests Tab */}
      {activeTab === "my-requests" && (
        <div className="requests-list">
          {myRequests.length === 0 ? (
            <div className="empty-state">
              <RotateCcw size={48} className="empty-icon" />
              <h3>No Requests Yet</h3>
              <p>You haven't created any substitution requests.</p>
            </div>
          ) : (
            myRequests.map((request) => (
              <div key={request._id} className="request-card">
                <div className="request-header-card">
                  <h4>Request Details</h4>
                  {getStatusBadge(request.status)}
                </div>

                <div className="request-details">
                  <div className="detail-item">
                    <BookOpen size={16} />
                    <span>
                      <strong>{request.subject}</strong> - {request.className}
                    </span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>{formatDate(request.date)}</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={16} />
                    <span>
                      {request.startTime} - {request.endTime}
                    </span>
                  </div>
                  {request.substitutingFaculty && (
                    <div className="detail-item">
                      <User size={16} />
                      <span>
                        Assigned to:{" "}
                        <strong>{request.substitutingFaculty.name}</strong>
                      </span>
                    </div>
                  )}
                </div>

                {request.creditsUsed > 0 && (
                  <div className="credit-info">
                    <p>Credits used: {request.creditsUsed}</p>
                  </div>
                )}

                {request.status !== "completed" &&
                  request.status !== "cancelled" && (
                    <div className="request-actions">
                      {request.status === "accepted" && (
                        <button
                          className="complete-btn"
                          onClick={() => handleComplete(request._id)}
                          disabled={actionLoading === request._id}
                        >
                          <CheckSquare size={18} />
                          {actionLoading === request._id
                            ? "Processing..."
                            : "Mark as Completed"}
                        </button>
                      )}
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(request._id)}
                        disabled={actionLoading === request._id}
                      >
                        <XSquare size={18} />
                        Cancel Request
                      </button>
                    </div>
                  )}
              </div>
            ))
          )}
        </div>
      )}

      {/* My Substitutions Tab */}
      {activeTab === "my-substitutions" && (
        <div className="requests-list">
          {mySubstitutions.length === 0 ? (
            <div className="empty-state">
              <User size={48} className="empty-icon" />
              <h3>No Substitutions Yet</h3>
              <p>You haven't taken any substitution assignments.</p>
            </div>
          ) : (
            mySubstitutions.map((sub) => (
              <div key={sub._id} className="request-card substitution">
                <div className="request-header-card">
                  <div className="requester-info">
                    <div className="avatar">
                      {sub.requestingFaculty.name.charAt(0)}
                    </div>
                    <div>
                      <h4>Substituting for {sub.requestingFaculty.name}</h4>
                      <p>{sub.requestingFaculty.department}</p>
                    </div>
                  </div>
                  {getStatusBadge(sub.status)}
                </div>

                <div className="request-details">
                  <div className="detail-item">
                    <BookOpen size={16} />
                    <span>
                      <strong>{sub.subject}</strong> - {sub.className}
                    </span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>{formatDate(sub.date)}</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={16} />
                    <span>
                      {sub.startTime} - {sub.endTime}
                    </span>
                  </div>
                </div>

                {sub.status === "accepted" && (
                  <div className="request-actions">
                    <button
                      className="complete-btn"
                      onClick={() => handleComplete(sub._id)}
                      disabled={actionLoading === sub._id}
                    >
                      <CheckSquare size={18} />
                      {actionLoading === sub._id
                        ? "Processing..."
                        : "Mark as Completed"}
                    </button>
                  </div>
                )}

                {sub.status === "completed" && (
                  <div className="completed-badge">
                    <CheckCircle size={16} />
                    <span>You earned 1 credit for this substitution!</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SubstitutionRequests;
