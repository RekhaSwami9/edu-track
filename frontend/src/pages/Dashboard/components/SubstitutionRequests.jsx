import { useNavigate } from "react-router-dom";
import "./SubstitutionRequests.css";

const SubstitutionRequests = () => {
  const navigate = useNavigate();

  const handleAccept = (professorName) => {
    alert(`Accepted substitution request from ${professorName}`);
  };

  const handleDecline = (professorName) => {
    alert(`Declined substitution request from ${professorName}`);
  };

  const handleViewAll = () => {
    navigate("/substitution-requests");
  };

  return (
    <div className="sub-card">
      <div className="sub-header">
        <div>
          <h3>Substitution Requests</h3>
          <p>Colleagues requesting your help</p>
        </div>
        <span className="badge pending">3 Pending</span>
      </div>

      <div className="sub-item">
        <div className="avatar">SJ</div>
        <div className="info">
          <strong>Prof. Sarah Jenkins</strong>
          <p>Data Structures (CS-201)</p>
          <span>Tomorrow · 10:00–11:00 · Lab 3</span>
        </div>
        <div className="actions">
          <button
            className="btn-outline"
            onClick={() => handleDecline("Prof. Sarah Jenkins")}
          >
            Decline
          </button>
          <button
            className="btn-primary"
            onClick={() => handleAccept("Prof. Sarah Jenkins")}
          >
            Accept
          </button>
        </div>
      </div>

      <div className="sub-item">
        <div className="avatar">JW</div>
        <div className="info">
          <strong>Dr. James Wilson</strong>
          <p>Operating Systems (CS-304)</p>
          <span>Friday · 2:00–3:00 · Hall B</span>
        </div>
        <div className="actions">
          <button
            className="btn-outline"
            onClick={() => handleDecline("Dr. James Wilson")}
          >
            Decline
          </button>
          <button
            className="btn-primary"
            onClick={() => handleAccept("Dr. James Wilson")}
          >
            Accept
          </button>
        </div>
      </div>

      <div
        className="view-all"
        onClick={handleViewAll}
        style={{ cursor: "pointer" }}
      >
        View All Requests
      </div>
    </div>
  );
};

export default SubstitutionRequests;
