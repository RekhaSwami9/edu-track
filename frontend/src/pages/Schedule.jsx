import { useState } from "react";
import "./Schedule.css";

const Schedule = () => {
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [viewMode, setViewMode] = useState("week"); // week or day

  // Dummy schedule data
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const scheduleData = {
    Monday: [
      {
        time: "09:00 - 10:00",
        subject: "Data Structures",
        code: "CS-201",
        room: "Room 204",
        type: "Lecture",
      },
      {
        time: "10:00 - 11:00",
        subject: "Algorithms",
        code: "CS-301",
        room: "Lab 2",
        type: "Lab",
      },
      {
        time: "11:30 - 12:30",
        subject: "Database Systems",
        code: "CS-205",
        room: "Room 301",
        type: "Lecture",
      },
      {
        time: "14:00 - 15:00",
        subject: "Operating Systems",
        code: "CS-304",
        room: "Hall B",
        type: "Lecture",
      },
    ],
    Tuesday: [
      {
        time: "09:00 - 10:00",
        subject: "Computer Networks",
        code: "CS-302",
        room: "Room 205",
        type: "Lecture",
      },
      {
        time: "11:00 - 12:00",
        subject: "Web Development",
        code: "CS-401",
        room: "Lab 3",
        type: "Lab",
      },
      {
        time: "14:00 - 15:30",
        subject: "Machine Learning",
        code: "CS-501",
        room: "Room 401",
        type: "Lecture",
      },
    ],
    Wednesday: [
      {
        time: "09:00 - 10:00",
        subject: "Data Structures",
        code: "CS-201",
        room: "Room 204",
        type: "Tutorial",
      },
      {
        time: "10:30 - 11:30",
        subject: "Software Engineering",
        code: "CS-305",
        room: "Room 302",
        type: "Lecture",
      },
      {
        time: "13:00 - 14:00",
        subject: "Algorithms",
        code: "CS-301",
        room: "Lab 2",
        type: "Lab",
      },
      {
        time: "15:00 - 16:00",
        subject: "Project Guidance",
        code: "CS-499",
        room: "Room 501",
        type: "Seminar",
      },
    ],
    Thursday: [
      {
        time: "09:00 - 10:30",
        subject: "Database Systems",
        code: "CS-205",
        room: "Room 301",
        type: "Lecture",
      },
      {
        time: "11:00 - 12:00",
        subject: "Computer Networks",
        code: "CS-302",
        room: "Room 205",
        type: "Lab",
      },
      {
        time: "14:00 - 15:00",
        subject: "Operating Systems",
        code: "CS-304",
        room: "Hall B",
        type: "Tutorial",
      },
    ],
    Friday: [
      {
        time: "09:00 - 10:00",
        subject: "Web Development",
        code: "CS-401",
        room: "Lab 3",
        type: "Lab",
      },
      {
        time: "10:30 - 11:30",
        subject: "Machine Learning",
        code: "CS-501",
        room: "Room 401",
        type: "Lecture",
      },
      {
        time: "13:00 - 14:30",
        subject: "Faculty Meeting",
        code: "ADMIN",
        room: "Conference Hall",
        type: "Meeting",
      },
    ],
    Saturday: [
      {
        time: "09:00 - 12:00",
        subject: "Project Reviews",
        code: "CS-499",
        room: "Lab 1",
        type: "Review",
      },
    ],
  };

  const handleExportSchedule = () => {
    alert("Schedule exported to PDF!\n\nFile: My_Schedule_Week_5.pdf");
  };

  const handlePrintSchedule = () => {
    alert("Opening print dialog...");
  };

  const handleClassClick = (classItem) => {
    alert(
      `Class Details:\n\nSubject: ${classItem.subject}\nCode: ${classItem.code}\nTime: ${classItem.time}\nRoom: ${classItem.room}\nType: ${classItem.type}`,
    );
  };

  const getTypeClass = (type) => {
    switch (type) {
      case "Lecture":
        return "type-lecture";
      case "Lab":
        return "type-lab";
      case "Tutorial":
        return "type-tutorial";
      case "Meeting":
        return "type-meeting";
      default:
        return "type-other";
    }
  };

  return (
    <div className="schedule-page">
      <div className="schedule-header">
        <div>
          <h2>My Schedule</h2>
          <p className="subtitle">Academic Year 2025-26 • Semester 2</p>
        </div>
        <div className="header-actions">
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="week-selector"
          >
            <option value="prev">Week 4 (Jan 20-25)</option>
            <option value="current">Week 5 (Jan 27 - Feb 1)</option>
            <option value="next">Week 6 (Feb 3-8)</option>
          </select>
          <button
            className="btn-icon"
            onClick={handleExportSchedule}
            title="Export PDF"
          >
            📄
          </button>
          <button
            className="btn-icon"
            onClick={handlePrintSchedule}
            title="Print"
          >
            🖨
          </button>
        </div>
      </div>

      <div className="view-toggle">
        <button
          className={viewMode === "week" ? "active" : ""}
          onClick={() => setViewMode("week")}
        >
          Week View
        </button>
        <button
          className={viewMode === "day" ? "active" : ""}
          onClick={() => setViewMode("day")}
        >
          Day View
        </button>
      </div>

      <div className="schedule-container">
        {weekDays.map((day) => (
          <div key={day} className="day-column">
            <div className="day-header">
              <h4>{day}</h4>
              <span className="date">{getDateForDay(day)}</span>
            </div>
            <div className="classes-list">
              {scheduleData[day]?.map((classItem, index) => (
                <div
                  key={index}
                  className={`class-card ${getTypeClass(classItem.type)}`}
                  onClick={() => handleClassClick(classItem)}
                >
                  <span className="class-time">{classItem.time}</span>
                  <h5 className="class-subject">{classItem.subject}</h5>
                  <p className="class-code">{classItem.code}</p>
                  <div className="class-footer">
                    <span className="class-room">📍 {classItem.room}</span>
                    <span className="class-type">{classItem.type}</span>
                  </div>
                </div>
              ))}
              {(!scheduleData[day] || scheduleData[day].length === 0) && (
                <div className="no-classes">No classes</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="schedule-legend">
        <div className="legend-item">
          <span className="dot lecture"></span> Lecture
        </div>
        <div className="legend-item">
          <span className="dot lab"></span> Lab
        </div>
        <div className="legend-item">
          <span className="dot tutorial"></span> Tutorial
        </div>
        <div className="legend-item">
          <span className="dot meeting"></span> Meeting
        </div>
      </div>
    </div>
  );
};

// Helper function to get dates
function getDateForDay(day) {
  const dates = {
    Monday: "Jan 27",
    Tuesday: "Jan 28",
    Wednesday: "Jan 29",
    Thursday: "Jan 30",
    Friday: "Jan 31",
    Saturday: "Feb 1",
  };
  return dates[day] || "";
}

export default Schedule;
