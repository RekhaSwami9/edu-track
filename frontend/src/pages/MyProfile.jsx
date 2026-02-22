import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser, updateProfile, changePassword } from "../services/api";
import {
  User,
  Mail,
  Phone,
  Building,
  BookOpen,
  Award,
  Calendar,
  Edit2,
  Save,
  Camera,
  Lock,
  LogOut,
  Loader,
} from "lucide-react";
import "./MyProfile.css";

const MyProfile = () => {
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // User data from API
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    employeeId: "",
    joinDate: "",
    specialization: "",
    qualifications: [],
    subjects: [],
    credits: 0,
    totalSubstitutions: 0,
    rating: 0,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser();
      const user = response.data.user;

      setProfileData({
        name: user.name || "Dr. John Smith",
        email: user.email || "john.smith@edutrack.edu",
        phone: user.phone || "+1 (555) 123-4567",
        department: user.department || "Computer Science",
        designation: user.designation || "Associate Professor",
        employeeId: user.employeeId || "FAC2025001",
        joinDate: user.joinDate || "2020-08-15",
        specialization:
          user.specialization || "Artificial Intelligence & Machine Learning",
        qualifications: user.qualifications || [
          "Ph.D. in Computer Science",
          "M.Tech in AI",
          "B.E. in Computer Engineering",
        ],
        subjects: user.subjects || [
          "Data Structures",
          "Algorithms",
          "Machine Learning",
          "Deep Learning",
        ],
        credits: user.credits || 45,
        totalSubstitutions: user.totalSubstitutions || 12,
        rating: user.rating || 4.8,
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load profile data" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await updateProfile({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        department: profileData.department,
        designation: profileData.designation,
        specialization: profileData.specialization,
      });
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      // Refresh data
      fetchUserData();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match!" });
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setMessage({ type: "success", text: "Password changed successfully!" });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to change password",
      });
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      localStorage.removeItem("token");
      localStorage.removeItem("eduTrackUser");
      window.location.href = "/login";
    }
  };

  const handlePhotoUpload = () => {
    alert("Photo upload feature would open here! (requires file upload API)");
  };

  if (loading) {
    return (
      <div className="profile-page loading">
        <Loader size={40} className="spin" />
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>My Profile</h2>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-photo-section">
          <div className="profile-photo">
            <span className="photo-placeholder">
              {profileData.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </span>
            <button className="photo-upload-btn" onClick={handlePhotoUpload}>
              <Camera size={16} />
            </button>
          </div>
          <div className="profile-basic-info">
            <h3>{profileData.name}</h3>
            <p className="designation">{profileData.designation}</p>
            <p className="department">{profileData.department}</p>
            <div className="profile-badges">
              <span className="badge credits">
                <Award size={14} />
                {profileData.credits} Credits
              </span>
              <span className="badge rating">⭐ {profileData.rating}</span>
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-box">
            <span className="stat-value">{profileData.totalSubstitutions}</span>
            <span className="stat-label">Substitutions</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{profileData.subjects.length}</span>
            <span className="stat-label">Subjects</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">
              {new Date().getFullYear() -
                new Date(profileData.joinDate).getFullYear()}
            </span>
            <span className="stat-label">Years</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          <User size={16} />
          Personal Info
        </button>
        <button
          className={activeTab === "professional" ? "active" : ""}
          onClick={() => setActiveTab("professional")}
        >
          <BookOpen size={16} />
          Professional
        </button>
        <button
          className={activeTab === "security" ? "active" : ""}
          onClick={() => setActiveTab("security")}
        >
          <Lock size={16} />
          Security
        </button>
      </div>

      {/* Personal Info Tab */}
      {activeTab === "profile" && (
        <div className="profile-section">
          <div className="section-header">
            <h3>Personal Information</h3>
            <button
              className="edit-btn"
              onClick={() =>
                isEditing ? handleSaveProfile() : setIsEditing(true)
              }
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader size={16} className="spin" /> Saving...
                </>
              ) : isEditing ? (
                <>
                  <Save size={16} /> Save
                </>
              ) : (
                <>
                  <Edit2 size={16} /> Edit
                </>
              )}
            </button>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label>
                <User size={14} /> Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.name}</p>
              )}
            </div>

            <div className="info-item">
              <label>
                <Mail size={14} /> Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.email}</p>
              )}
            </div>

            <div className="info-item">
              <label>
                <Phone size={14} /> Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.phone}</p>
              )}
            </div>

            <div className="info-item">
              <label>
                <Building size={14} /> Department
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="department"
                  value={profileData.department}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.department}</p>
              )}
            </div>

            <div className="info-item">
              <label>
                <Award size={14} /> Designation
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="designation"
                  value={profileData.designation}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.designation}</p>
              )}
            </div>

            <div className="info-item">
              <label>
                <Calendar size={14} /> Join Date
              </label>
              <p>{new Date(profileData.joinDate).toLocaleDateString()}</p>
            </div>

            <div className="info-item full-width">
              <label>Employee ID</label>
              <p className="employee-id">{profileData.employeeId}</p>
            </div>
          </div>
        </div>
      )}

      {/* Professional Tab */}
      {activeTab === "professional" && (
        <div className="profile-section">
          <h3>Professional Information</h3>

          <div className="professional-content">
            <div className="info-block">
              <h4>Specialization</h4>
              <p>{profileData.specialization}</p>
            </div>

            <div className="info-block">
              <h4>Qualifications</h4>
              <ul className="qualifications-list">
                {profileData.qualifications.map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ul>
            </div>

            <div className="info-block">
              <h4>Subjects Teaching</h4>
              <div className="subjects-tags">
                {profileData.subjects.map((subject, index) => (
                  <span key={index} className="subject-tag">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="profile-section">
          <h3>Security Settings</h3>

          <form onSubmit={handleChangePassword} className="password-form">
            <h4>Change Password</h4>

            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                required
              />
            </div>

            <button type="submit" className="change-password-btn">
              Change Password
            </button>
          </form>

          <div className="security-info">
            <h4>Account Security</h4>
            <div className="security-item">
              <span>Last Login</span>
              <strong>{new Date().toLocaleString()}</strong>
            </div>
            <div className="security-item">
              <span>Account Status</span>
              <span className="status-active">Active</span>
            </div>
            <div className="security-item">
              <span>Two-Factor Authentication</span>
              <button className="enable-2fa">Enable</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
