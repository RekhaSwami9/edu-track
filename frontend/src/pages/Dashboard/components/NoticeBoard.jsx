import { useNavigate } from "react-router-dom";
import "./NoticeBoard.css";

const NoticeBoard = () => {
  const navigate = useNavigate();

  const handleViewAllNotices = () => {
    // For now, show an alert as this feature may not be implemented yet
    alert("Full Notice Board feature coming soon!");
  };

  const handleNoticeClick = (noticeTitle) => {
    alert(`Notice: ${noticeTitle}\n\nDetailed view coming soon!`);
  };

  return (
    <div className="notice-card">
      <h3>Notice Board</h3>

      <div
        className="notice-item"
        onClick={() => handleNoticeClick("Faculty Meeting")}
        style={{ cursor: "pointer" }}
      >
        <span className="dot blue"></span>
        <p>
          <strong>Faculty Meeting</strong>
          <br />
          Tomorrow at 3:00 PM in Conference Hall
        </p>
      </div>

      <div
        className="notice-item"
        onClick={() => handleNoticeClick("Exam Schedule Updated")}
        style={{ cursor: "pointer" }}
      >
        <span className="dot green"></span>
        <p>
          <strong>Exam Schedule Updated</strong>
          <br />
          Mid-term exams dates revised
        </p>
      </div>

      <div
        className="notice-item"
        onClick={() => handleNoticeClick("Workshop Registration")}
        style={{ cursor: "pointer" }}
      >
        <span className="dot orange"></span>
        <p>
          <strong>Workshop Registration</strong>
          <br />
          AI & ML workshop registrations open
        </p>
      </div>

      <div
        className="view-all"
        onClick={handleViewAllNotices}
        style={{ cursor: "pointer" }}
      >
        View All Notices
      </div>
    </div>
  );
};

export default NoticeBoard;
