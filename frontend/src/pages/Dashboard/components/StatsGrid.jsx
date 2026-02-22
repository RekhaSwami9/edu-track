import StatsCard from "./StatsCard";
import "./StatsGrid.css";

const StatsGrid = () => {
  return (
    <div className="stats-grid">
      <StatsCard title="Classes Today" value="4" type="events" />
      <StatsCard title="Pending Requests" value="3" type="pending" />
      <StatsCard title="This Week" value="18" type="schedule" />
      <StatsCard title="Substitutions" value="2" type="substitutions" />
    </div>
  );
};

export default StatsGrid;
