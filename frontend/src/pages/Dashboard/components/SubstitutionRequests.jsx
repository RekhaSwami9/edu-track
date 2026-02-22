import "./SubstitutionRequests.css";

const SubstitutionRequests = () => {
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
          <button className="btn-outline">Decline</button>
          <button className="btn-primary">Accept</button>
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
          <button className="btn-outline">Decline</button>
          <button className="btn-primary">Accept</button>
        </div>
      </div>

      <div className="view-all">View All Requests</div>
    </div>
  );
};

export default SubstitutionRequests;
