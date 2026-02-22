import { useNavigate } from "react-router-dom";
import "./TodaySchedule.css";

const TodaySchedule = () => {
  const navigate = useNavigate();

  const handleViewFullSchedule = () => {
    navigate("/schedule");
  };

  return (
    <div className="schedule-card">
      <h3>Today's Schedule</h3>

      <div className="schedule-item">
        <span className="time">09:00</span>
        <div>
          <strong>Data Structures</strong>
          <p>CS-201 · Room 204</p>
        </div>
      </div>

      <div className="schedule-item">
        <span className="time">11:00</span>
        <div>
          <strong>Algorithms</strong>
          <p>CS-301 · Lab 2</p>
        </div>
      </div>

      <div className="schedule-item">
        <span className="time">14:00</span>
        <div>
          <strong>Operating Systems</strong>
          <p>CS-304 · Hall B</p>
        </div>
      </div>

      <div
        className="view-all"
        onClick={handleViewFullSchedule}
        style={{ cursor: "pointer" }}
      >
        View Full Schedule
      </div>
    </div>
  );
};

export default TodaySchedule;
