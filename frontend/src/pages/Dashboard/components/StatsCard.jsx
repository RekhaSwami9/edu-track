import { useNavigate } from "react-router-dom";
import { MdEvent, MdPending, MdSchedule, MdSwapHoriz } from "react-icons/md";
import "./StatsCard.css";

const icons = {
  events: <MdEvent />,
  pending: <MdPending />,
  schedule: <MdSchedule />,
  substitutions: <MdSwapHoriz />,
};

const routeMap = {
  events: "/schedule",
  pending: "/substitution-requests",
  schedule: "/schedule",
  substitutions: "/substitution-requests",
};

const StatsCard = ({ title, value, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const route = routeMap[type];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div
      className="stats-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className={`stats-icon ${type}`}>{icons[type]}</div>
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default StatsCard;
