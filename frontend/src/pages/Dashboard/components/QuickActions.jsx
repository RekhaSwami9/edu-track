import { useNavigate } from "react-router-dom";
import {
  MdEventAvailable,
  MdSwapHoriz,
  MdSchedule,
  MdFolder,
} from "react-icons/md";
import "./QuickActions.css";

const QuickActions = () => {
  const navigate = useNavigate();

  const handleApplyLeave = () => {
    navigate("/leave");
  };

  const handleRequestSubstitution = () => {
    navigate("/request-substitution");
  };

  const handleViewTimetable = () => {
    navigate("/schedule");
  };

  const handleAcademicFiles = () => {
    // For now, show an alert as this feature may not be implemented yet
    alert("Academic Files feature coming soon!");
  };

  return (
    <div className="quick-card">
      <h3>Quick Actions</h3>

      <button className="quick-btn primary" onClick={handleApplyLeave}>
        <MdEventAvailable /> Apply for Leave
      </button>

      <button className="quick-btn" onClick={handleRequestSubstitution}>
        <MdSwapHoriz /> Request Substitution
      </button>

      <button className="quick-btn" onClick={handleViewTimetable}>
        <MdSchedule /> View Timetable
      </button>

      <button className="quick-btn" onClick={handleAcademicFiles}>
        <MdFolder /> Academic Files
      </button>
    </div>
  );
};

export default QuickActions;
