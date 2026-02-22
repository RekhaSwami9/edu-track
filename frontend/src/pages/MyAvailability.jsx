import { useState, useEffect } from "react";
import {
  Clock,
  Save,
  ToggleLeft,
  ToggleRight,
  Plus,
  Trash2,
} from "lucide-react";
import "./MyAvailability.css";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const dayLabels = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

// Dummy initial availability data
const dummyAvailability = {
  isActive: true,
  monday: [
    { startTime: "09:00", endTime: "12:00" },
    { startTime: "14:00", endTime: "17:00" },
  ],
  tuesday: [{ startTime: "10:00", endTime: "13:00" }],
  wednesday: [
    { startTime: "09:00", endTime: "12:00" },
    { startTime: "15:00", endTime: "17:00" },
  ],
  thursday: [{ startTime: "11:00", endTime: "14:00" }],
  friday: [
    { startTime: "09:00", endTime: "11:00" },
    { startTime: "13:00", endTime: "16:00" },
  ],
  saturday: [],
  sunday: [],
};

const MyAvailability = () => {
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setAvailability(dummyAvailability);
      setLoading(false);
    }, 500);
  }, []);

  const handleToggleStatus = () => {
    setAvailability((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
    setMessage({
      type: "success",
      text: `Availability ${!availability.isActive ? "activated" : "deactivated"} (dummy)`,
    });
  };

  const addTimeSlot = (day) => {
    const newSlot = { startTime: "09:00", endTime: "17:00" };
    setAvailability((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), newSlot],
    }));
  };

  const removeTimeSlot = (day, index) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const updateTimeSlot = (day, index, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot,
      ),
    }));
  };

  const handleSave = () => {
    setSaving(true);
    // Simulate API save
    setTimeout(() => {
      setSaving(false);
      setMessage({
        type: "success",
        text: "Availability saved successfully! (dummy)",
      });
    }, 800);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="my-availability">
      <div className="availability-header">
        <h1>My Availability</h1>
        <div className="header-actions">
          <button
            className={`toggle-btn ${availability.isActive ? "active" : ""}`}
            onClick={handleToggleStatus}
          >
            {availability.isActive ? (
              <>
                <ToggleRight size={20} /> Active
              </>
            ) : (
              <>
                <ToggleLeft size={20} /> Inactive
              </>
            )}
          </button>
          <button className="save-btn" onClick={handleSave} disabled={saving}>
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="availability-info">
        <p>
          <Clock size={16} />
          Set your weekly availability for substitution requests. Faculties can
          only request substitutions during your available time slots.
        </p>
      </div>

      <div className="availability-grid">
        {days.map((day) => (
          <div key={day} className="day-card">
            <div className="day-header">
              <h3>{dayLabels[day]}</h3>
              <button
                className="add-slot-btn"
                onClick={() => addTimeSlot(day)}
                title="Add time slot"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="time-slots">
              {availability[day]?.length === 0 ? (
                <p className="no-slots">No availability set</p>
              ) : (
                availability[day]?.map((slot, index) => (
                  <div key={index} className="time-slot">
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) =>
                        updateTimeSlot(day, index, "startTime", e.target.value)
                      }
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) =>
                        updateTimeSlot(day, index, "endTime", e.target.value)
                      }
                    />
                    <button
                      className="remove-btn"
                      onClick={() => removeTimeSlot(day, index)}
                      title="Remove slot"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAvailability;
