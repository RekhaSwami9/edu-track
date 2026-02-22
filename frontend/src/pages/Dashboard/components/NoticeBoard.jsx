import "./NoticeBoard.css";

const NoticeBoard = () => {
  return (
    <div className="notice-card">
      <h3>Notice Board</h3>

      <div className="notice-item">
        <span className="dot blue"></span>
        <p>
          <strong>Faculty Meeting</strong>
          <br />
          Tomorrow at 3:00 PM in Conference Hall
        </p>
      </div>

      <div className="notice-item">
        <span className="dot green"></span>
        <p>
          <strong>Exam Schedule Updated</strong>
          <br />
          Mid-term exams dates revised
        </p>
      </div>

      <div className="notice-item">
        <span className="dot orange"></span>
        <p>
          <strong>Workshop Registration</strong>
          <br />
          AI & ML workshop registrations open
        </p>
      </div>

      <div className="view-all">View All Notices</div>
    </div>
  );
};

export default NoticeBoard;
