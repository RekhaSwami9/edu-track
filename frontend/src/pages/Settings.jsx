import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Globe,
  Database,
  Moon,
  Sun,
  ChevronRight,
  Check,
  Lock,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Download,
} from "lucide-react";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    substitutionRequests: true,
    creditUpdates: true,
    scheduleChanges: true,
    leaveApprovals: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@school.edu",
    phone: "+1 (555) 123-4567",
    department: "Mathematics",
    role: "Teacher",
    bio: "Mathematics teacher with 5+ years of experience.",
  });

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setSaveStatus("Saving...");
    setTimeout(() => {
      setSaveStatus("Saved successfully!");
      setTimeout(() => setSaveStatus(""), 2000);
    }, 1000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: darkMode ? Moon : Sun },
    { id: "language", label: "Language", icon: Globe },
    { id: "data", label: "Data & Privacy", icon: Database },
  ];

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and settings</p>
      </div>

      <div className="settings-layout">
        {/* Sidebar Tabs */}
        <div className="settings-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                <ChevronRight size={16} className="tab-arrow" />
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="settings-content">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="settings-section">
              <h2>Profile Settings</h2>
              <p className="section-description">
                Update your personal information and profile details
              </p>

              <div className="profile-avatar-section">
                <div className="avatar-preview">
                  <img
                    src={`https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}&background=6366f1&color=fff&size=128`}
                    alt="Profile"
                  />
                  <button className="change-avatar-btn">Change Photo</button>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select
                    name="department"
                    value={profileData.department}
                    onChange={handleProfileChange}
                  >
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>History</option>
                    <option>Physical Education</option>
                    <option>Arts</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    name="role"
                    value={profileData.role}
                    onChange={handleProfileChange}
                  >
                    <option>Teacher</option>
                    <option>Department Head</option>
                    <option>Administrator</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Bio</label>
                <textarea
                  name="bio"
                  rows="4"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="settings-actions">
                <button className="save-btn" onClick={handleSave}>
                  <Save size={18} />
                  Save Changes
                </button>
                {saveStatus && (
                  <span className="save-status">{saveStatus}</span>
                )}
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <p className="section-description">
                Choose how you want to be notified
              </p>

              <div className="notification-channels">
                <h3>Notification Channels</h3>
                <div className="toggle-list">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <Mail size={20} />
                      <div>
                        <span className="toggle-label">
                          Email Notifications
                        </span>
                        <span className="toggle-desc">
                          Receive updates via email
                        </span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => handleNotificationChange("email")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-info">
                      <Bell size={20} />
                      <div>
                        <span className="toggle-label">Push Notifications</span>
                        <span className="toggle-desc">
                          Browser push notifications
                        </span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={() => handleNotificationChange("push")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-info">
                      <Smartphone size={20} />
                      <div>
                        <span className="toggle-label">SMS Notifications</span>
                        <span className="toggle-desc">Text message alerts</span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange("sms")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="notification-types">
                <h3>Notification Types</h3>
                <div className="toggle-list">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">
                        Substitution Requests
                      </span>
                      <span className="toggle-desc">
                        New requests and updates
                      </span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.substitutionRequests}
                        onChange={() =>
                          handleNotificationChange("substitutionRequests")
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">Credit Updates</span>
                      <span className="toggle-desc">
                        Credit balance changes
                      </span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.creditUpdates}
                        onChange={() =>
                          handleNotificationChange("creditUpdates")
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">Schedule Changes</span>
                      <span className="toggle-desc">
                        Updates to your schedule
                      </span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.scheduleChanges}
                        onChange={() =>
                          handleNotificationChange("scheduleChanges")
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-info">
                      <span className="toggle-label">Leave Approvals</span>
                      <span className="toggle-desc">
                        Leave request status updates
                      </span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.leaveApprovals}
                        onChange={() =>
                          handleNotificationChange("leaveApprovals")
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button className="save-btn" onClick={handleSave}>
                  <Save size={18} />
                  Save Preferences
                </button>
                {saveStatus && (
                  <span className="save-status">{saveStatus}</span>
                )}
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              <p className="section-description">
                Manage your account security and password
              </p>

              <div className="security-section">
                <h3>Change Password</h3>
                <div className="form-group">
                  <label>Current Password</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                    <button
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <button className="save-btn secondary">Update Password</button>
              </div>

              <div className="security-section">
                <h3>Two-Factor Authentication</h3>
                <div className="two-factor-status">
                  <div className="status-info">
                    <Shield size={24} />
                    <div>
                      <span className="status-label">2FA Status</span>
                      <span className="status-value disabled">Disabled</span>
                    </div>
                  </div>
                  <button className="enable-2fa-btn">Enable 2FA</button>
                </div>
              </div>

              <div className="security-section">
                <h3>Active Sessions</h3>
                <div className="session-list">
                  <div className="session-item current">
                    <div className="session-info">
                      <span className="device">
                        Current Device - Chrome on macOS
                      </span>
                      <span className="location">
                        New York, USA • Active now
                      </span>
                    </div>
                    <span className="current-badge">Current</span>
                  </div>
                </div>
                <button className="logout-all-btn">
                  Log out all other devices
                </button>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="settings-section">
              <h2>Appearance</h2>
              <p className="section-description">
                Customize the look and feel of the application
              </p>

              <div className="theme-section">
                <h3>Theme</h3>
                <div className="theme-options">
                  <button
                    className={`theme-option ${!darkMode ? "active" : ""}`}
                    onClick={() => setDarkMode(false)}
                  >
                    <div className="theme-preview light">
                      <div className="preview-sidebar"></div>
                      <div className="preview-content"></div>
                    </div>
                    <span>Light</span>
                    {!darkMode && <Check size={16} className="check-icon" />}
                  </button>

                  <button
                    className={`theme-option ${darkMode ? "active" : ""}`}
                    onClick={() => setDarkMode(true)}
                  >
                    <div className="theme-preview dark">
                      <div className="preview-sidebar"></div>
                      <div className="preview-content"></div>
                    </div>
                    <span>Dark</span>
                    {darkMode && <Check size={16} className="check-icon" />}
                  </button>
                </div>
              </div>

              <div className="settings-actions">
                <button className="save-btn" onClick={handleSave}>
                  <Save size={18} />
                  Save Preferences
                </button>
                {saveStatus && (
                  <span className="save-status">{saveStatus}</span>
                )}
              </div>
            </div>
          )}

          {/* Language Settings */}
          {activeTab === "language" && (
            <div className="settings-section">
              <h2>Language & Region</h2>
              <p className="section-description">
                Set your preferred language and regional settings
              </p>

              <div className="form-group">
                <label>Language</label>
                <select defaultValue="en">
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="hi">हिन्दी</option>
                  <option value="zh">中文</option>
                </select>
              </div>

              <div className="form-group">
                <label>Time Zone</label>
                <select defaultValue="America/New_York">
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date Format</label>
                <select defaultValue="MM/DD/YYYY">
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div className="form-group">
                <label>Time Format</label>
                <select defaultValue="12h">
                  <option value="12h">12-hour (AM/PM)</option>
                  <option value="24h">24-hour</option>
                </select>
              </div>

              <div className="settings-actions">
                <button className="save-btn" onClick={handleSave}>
                  <Save size={18} />
                  Save Preferences
                </button>
                {saveStatus && (
                  <span className="save-status">{saveStatus}</span>
                )}
              </div>
            </div>
          )}

          {/* Data & Privacy Settings */}
          {activeTab === "data" && (
            <div className="settings-section">
              <h2>Data & Privacy</h2>
              <p className="section-description">
                Manage your data and privacy settings
              </p>

              <div className="privacy-section">
                <h3>Data Export</h3>
                <p>Download a copy of your personal data</p>
                <button className="export-btn">
                  <Download size={18} />
                  Export My Data
                </button>
              </div>

              <div className="privacy-section">
                <h3>Account Deletion</h3>
                <p>Permanently delete your account and all associated data</p>
                <div className="danger-zone">
                  <div className="danger-info">
                    <Trash2 size={24} color="#ef4444" />
                    <div>
                      <span className="danger-title">Delete Account</span>
                      <span className="danger-desc">
                        This action cannot be undone. All your data will be
                        permanently removed.
                      </span>
                    </div>
                  </div>
                  <button className="delete-account-btn">Delete Account</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
