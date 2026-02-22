import { MdEvent, MdPending, MdSchedule, MdSwapHoriz } from "react-icons/md";
import "./StatsCard.css";

const icons = {
  events: <MdEvent />,
  pending: <MdPending />,
  schedule: <MdSchedule />,
  substitutions: <MdSwapHoriz />,
};

const StatsCard = ({ title, value, type }) => {
  return (
    <div className="stats-card">
      <div className={`stats-icon ${type}`}>{icons[type]}</div>
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default StatsCard;
