import { useState } from "react";
import {
  Calendar,
  Clock,
  BookOpen,
  Users,
  CreditCard,
  Search,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "./RequestSubstitution.css";

// Dummy available faculties
const dummyAvailableFaculties = [
  {
    _id: "1",
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    credits: 45,
  },
  {
    _id: "2",
    name: "Prof. Michael Chen",
    department: "Computer Science",
    credits: 38,
  },
  {
    _id: "3",
    name: "Dr. Emily Williams",
    department: "Information Technology",
    credits: 52,
  },
  {
    _id: "4",
    name: "Prof. Robert Brown",
    department: "Computer Science",
    credits: 30,
  },
];

const RequestSubstitution = () => {
  const [formData, setFormData] = useState({
    subject: "",
    department: "",
    className: "",
    date: "",
    startTime: "",
    endTime: "",
    useCredits: false,
    creditsToUse: 1,
    notes: "",
  });

  const [availableFaculties, setAvailableFaculties] = useState([]);
  const [creditBalance] = useState(45); // Dummy credit balance
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const searchAvailableFaculties = () => {
    if (!formData.date || !formData.startTime || !formData.endTime) {
      setMessage({ type: "error", text: "Please fill in date and time first" });
      return;
    }

    setSearching(true);
    // Simulate API call with dummy data
    setTimeout(() => {
      setAvailableFaculties(dummyAvailableFaculties);
      setStep(2);
      setSearching(false);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Simulate API submission
    setTimeout(() => {
      setMessage({
        type: "success",
        text: "Substitution request submitted successfully! (dummy)",
      });
      // Reset form
      setFormData({
        subject: "",
        department: "",
        className: "",
        date: "",
        startTime: "",
        endTime: "",
        useCredits: false,
        creditsToUse: 1,
        notes: "",
      });
      setAvailableFaculties([]);
      setStep(1);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="request-substitution">
      <div className="request-header">
        <h1>Request Substitution</h1>
        <div className="credit-badge">
          <CreditCard size={18} />
          <span>Available Credits: {creditBalance}</span>
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          {message.text}
        </div>
      )}

      <div className="request-steps">
        <div className={`step ${step >= 1 ? "active" : ""}`}>
          <div className="step-number">1</div>
          <span>Class Details</span>
        </div>
        <div className="step-line"></div>
        <div className={`step ${step >= 2 ? "active" : ""}`}>
          <div className="step-number">2</div>
          <span>Review & Submit</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="request-form">
        {step === 1 && (
          <div className="form-section">
            <h3>Class Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <BookOpen size={16} /> Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Mathematics"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Users size={16} /> Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g., Science"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Class Name</label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
                placeholder="e.g., Class 10-A"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <Calendar size={16} /> Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <Clock size={16} /> Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Clock size={16} /> End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions for the substitute..."
                rows={3}
              />
            </div>

            <div className="credit-option">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="useCredits"
                  checked={formData.useCredits}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <div className="credit-info">
                  <strong>Use Credits for Auto-Assignment</strong>
                  <p>
                    Spend {formData.creditsToUse} credit to automatically assign
                    the best available faculty
                  </p>
                </div>
              </label>

              {formData.useCredits && (
                <div className="credit-input">
                  <label>Credits to use:</label>
                  <input
                    type="number"
                    name="creditsToUse"
                    min="1"
                    max={creditBalance}
                    value={formData.creditsToUse}
                    onChange={handleChange}
                  />
                  {formData.creditsToUse > creditBalance && (
                    <span className="error-text">
                      You don't have enough credits!
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="search-btn"
                onClick={searchAvailableFaculties}
                disabled={searching}
              >
                <Search size={18} />
                {searching ? "Searching..." : "Find Available Faculties"}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-section review-section">
            <h3>Review & Confirm</h3>

            <div className="review-card">
              <h4>Substitution Details</h4>
              <div className="review-item">
                <span>Subject:</span>
                <strong>{formData.subject}</strong>
              </div>
              <div className="review-item">
                <span>Department:</span>
                <strong>{formData.department}</strong>
              </div>
              <div className="review-item">
                <span>Class:</span>
                <strong>{formData.className}</strong>
              </div>
              <div className="review-item">
                <span>Date & Time:</span>
                <strong>
                  {formData.date} | {formData.startTime} - {formData.endTime}
                </strong>
              </div>
              {formData.notes && (
                <div className="review-item">
                  <span>Notes:</span>
                  <strong>{formData.notes}</strong>
                </div>
              )}
            </div>

            {formData.useCredits ? (
              <div className="auto-assign-info">
                <CheckCircle size={24} className="success-icon" />
                <div>
                  <h4>Auto-Assignment Enabled</h4>
                  <p>
                    {formData.creditsToUse} credit(s) will be used to
                    automatically assign a substitute. The system will select
                    the best available faculty based on their availability and
                    subject expertise.
                  </p>
                </div>
              </div>
            ) : (
              <div className="available-faculties">
                <h4>Available Faculties ({availableFaculties.length})</h4>
                {availableFaculties.length === 0 ? (
                  <p className="no-faculties">
                    No faculties available for this time slot. Consider using
                    credits for auto-assignment.
                  </p>
                ) : (
                  <div className="faculties-list">
                    {availableFaculties.slice(0, 5).map((faculty) => (
                      <div key={faculty._id} className="faculty-card">
                        <div className="faculty-avatar">
                          {faculty.name.charAt(0)}
                        </div>
                        <div className="faculty-details">
                          <p className="faculty-name">{faculty.name}</p>
                          <p className="faculty-dept">{faculty.department}</p>
                          <p className="faculty-credits">
                            Credits: {faculty.credits}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="back-btn"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={
                  loading ||
                  (formData.useCredits && formData.creditsToUse > creditBalance)
                }
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RequestSubstitution;
