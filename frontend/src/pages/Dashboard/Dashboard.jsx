import StatsGrid from "./components/StatsGrid";
import SubstitutionRequests from "./components/SubstitutionRequests";
import QuickActions from "./components/QuickActions";
import TodaySchedule from "./components/TodaySchedule";
import NoticeBoard from "./components/NoticeBoard";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <StatsGrid />

      <div className="dashboard-row">
        <SubstitutionRequests />
        <QuickActions />
      </div>

      <div className="dashboard-row">
        <TodaySchedule />
        <NoticeBoard />
      </div>
    </div>
  );
};

export default Dashboard;
