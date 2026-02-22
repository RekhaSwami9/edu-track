import { useState } from "react";
import "./Substitution.css";

const Substitution = () => {
  const [activeTab, setActiveTab] = useState("available");

  // Dummy data for available faculty
  const availableFaculty = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      department: "Computer Science",
      specialization: "AI & Machine Learning",
      freeSlots: ["Mon 10-12", "Wed 14-16", "Fri 09-11"],
      credits: 45,
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      department: "Computer Science",
      specialization: "Database Systems",
      freeSlots: ["Tue 09-11", "Thu 14-16"],
      credits: 38,
      avatar: "MC",
    },
    {
      id: 3,
      name: "Dr. Emily Williams",
      department: "Information Technology",
      specialization: "Cybersecurity",
      freeSlots: ["Mon 14-16", "Wed 09-11", "Fri 14-16"],
      credits: 52,
      avatar: "EW",
    },
    {
      id: 4,
      name: "Prof. Robert Brown",
      department: "Computer Science",
      specialization: "Software Engineering",
      freeSlots: ["Tue 14-16", "Thu 09-11"],
      credits: 30,
      avatar: "RB",
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      department: "Data Science",
      specialization: "Big Data Analytics",
      freeSlots: ["Mon 09-11", "Wed 14-16", "Fri 10-12"],
      credits: 41,
      avatar: "LA",
    },
  ];

  // Dummy data for my substitution requests
  const myRequests = [
    {
      id: 101,
      date: "2026-02-15",
      time: "10:00 - 11:00",
      subject: "Data Structures",
      originalFaculty: "You",
      substituteFaculty: "Dr. Sarah Johnson",
      status: "approved",
      reason: "Medical appointment",
    },
    {
      id: 102,
      date: "2026-02-20",
      time: "14:00 - 15:30",
      subject: "Algorithms",
      originalFaculty: "You",
      substituteFaculty: "Prof. Michael Chen",
      status: "pending",
      reason: "Conference attendance",
    },
    {
      id: 103,
      date: "2026-01-25",
      time: "09:00 - 10:00",
      subject: "Operating Systems",
      originalFaculty: "You",
      substituteFaculty: "Dr. Emily Williams",
      status: "completed",
      reason: "Family function",
    },
  ];

  // Dummy data for requests for me
  const requestsForMe = [
    {
      id: 201,
      date: "2026-02-18",
      time: "11:00 - 12:00",
      subject: "Web Development",
      requester: "Prof. James Wilson",
      department: "IT",
      status: "pending",
      credits: 2,
    },
    {
      id: 202,
      date: "2026-02-22",
      time: "14:00 - 15:00",
      subject: "Database Systems",
      requester: "Dr. Amanda Martinez",
      department: "CS",
      status: "pending",
      credits: 2,
    },
  ];

  const handleRequestSubstitution = (faculty) => {
    alert(
      `Substitution Request\n\nTo: ${faculty.name}\nDepartment: ${faculty.department}\nFree Slots: ${faculty.freeSlots.join(", ")}\n\nRequest form would open here!`,
    );
  };

  const handleAcceptRequest = (requestId) => {
    alert(
      `Accepted substitution request #${requestId}\n\n+2 credits added to your account!`,
    );
  };

  const handleDeclineRequest = (requestId) => {
    alert(`Declined substitution request #${requestId}`);
  };

  const handleViewDetails = (item) => {
    alert(
      `Request Details:\n\nDate: ${item.date}\nTime: ${item.time}\nSubject: ${item.subject}\nStatus: ${item.status}`,
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
      case "completed":
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
    <div className="substitution-page">
      <div className="substitution-header">
        <h2>Substitution Management</h2>
        <p className="subtitle">
          Find substitutes or manage your substitution requests
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "available" ? "active" : ""}
          onClick={() => setActiveTab("available")}
        >
          Available Faculty
        </button>
        <button
          className={activeTab === "my-requests" ? "active" : ""}
          onClick={() => setActiveTab("my-requests")}
        >
          My Requests
        </button>
        <button
          className={activeTab === "for-me" ? "active" : ""}
          onClick={() => setActiveTab("for-me")}
        >
          Requests For Me
        </button>
      </div>

      {/* Available Faculty Tab */}
      {activeTab === "available" && (
        <div className="faculty-grid">
          {availableFaculty.map((faculty) => (
            <div key={faculty.id} className="faculty-card">
              <div className="faculty-header">
                <div className="faculty-avatar">{faculty.avatar}</div>
                <div className="faculty-info">
                  <h4>{faculty.name}</h4>
                  <p>{faculty.department}</p>
                </div>
              </div>
              <div className="faculty-details">
                <p>
                  <strong>Specialization:</strong> {faculty.specialization}
                </p>
                <p>
                  <strong>Credits:</strong>{" "}
                  <span className="credit-badge">{faculty.credits}</span>
                </p>
                <div className="free-slots">
                  <strong>Free Slots:</strong>
                  <div className="slots-list">
                    {faculty.freeSlots.map((slot, idx) => (
                      <span key={idx} className="slot-tag">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                className="btn-request"
                onClick={() => handleRequestSubstitution(faculty)}
              >
                Request Substitution
              </button>
            </div>
          ))}
        </div>
      )}

      {/* My Requests Tab */}
      {activeTab === "my-requests" && (
        <div className="requests-list">
          <h3>My Substitution Requests</h3>
          <div className="table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Subject</th>
                  <th>Substitute</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.date}</td>
                    <td>{request.time}</td>
                    <td>{request.subject}</td>
                    <td>{request.substituteFaculty}</td>
                    <td>{request.reason}</td>
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(request.status)}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-icon"
                        onClick={() => handleViewDetails(request)}
                        title="View Details"
                      >
                        👁
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Requests For Me Tab */}
      {activeTab === "for-me" && (
        <div className="requests-list">
          <h3>Substitution Requests For You</h3>
          <div className="requests-cards">
            {requestsForMe.map((request) => (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <div>
                    <h4>{request.subject}</h4>
                    <p>
                      From: {request.requester} ({request.department})
                    </p>
                  </div>
                  <span className="credit-offer">
                    +{request.credits} credits
                  </span>
                </div>
                <div className="request-details">
                  <p>
                    <strong>Date:</strong> {request.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {request.time}
                  </p>
                </div>
                <div className="request-actions">
                  <button
                    className="btn-decline"
                    onClick={() => handleDeclineRequest(request.id)}
                  >
                    Decline
                  </button>
                  <button
                    className="btn-accept"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Substitution;
