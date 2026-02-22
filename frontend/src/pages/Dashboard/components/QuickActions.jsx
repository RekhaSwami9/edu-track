import {
  MdEventAvailable,
  MdSwapHoriz,
  MdSchedule,
  MdFolder,
} from "react-icons/md";
import "./QuickActions.css";

const QuickActions = () => {
  return (
    <div className="quick-card">
      <h3>Quick Actions</h3>

      <button className="quick-btn primary">
        <MdEventAvailable /> Apply for Leave
      </button>

      <button className="quick-btn">
        <MdSwapHoriz /> Request Substitution
      </button>

      <button className="quick-btn">
        <MdSchedule /> View Timetable
      </button>

      <button className="quick-btn">
        <MdFolder /> Academic Files
      </button>
    </div>
  );
};

export default QuickActions;
