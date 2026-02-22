import { useState } from "react";
import { Coins, TrendingUp, TrendingDown, Award, Users } from "lucide-react";
import "./MyCredits.css";

// Dummy data
const dummyBalance = {
  credits: 45,
  name: "Dr. John Smith",
};

const dummyStats = {
  totalSubstitutionsTaken: 12,
  totalSubstitutionsGiven: 8,
  lifetimeStats: {
    earned: { total: 52, count: 12 },
    used: { total: 15, count: 5 },
  },
  thisMonthStats: {
    earned: { total: 8 },
    used: { total: 2 },
  },
};

const dummyTransactions = [
  {
    _id: "1",
    type: "earned",
    amount: 2,
    description: "Substituted for Prof. Sarah Johnson - Data Structures",
    balanceAfter: 45,
    createdAt: "2026-02-15T10:30:00Z",
  },
  {
    _id: "2",
    type: "used",
    amount: 2,
    description: "Requested substitution for Algorithms class",
    balanceAfter: 43,
    createdAt: "2026-02-10T14:20:00Z",
  },
  {
    _id: "3",
    type: "earned",
    amount: 2,
    description: "Substituted for Dr. Emily Williams - Operating Systems",
    balanceAfter: 45,
    createdAt: "2026-02-05T09:15:00Z",
  },
  {
    _id: "4",
    type: "bonus",
    amount: 5,
    description: "Monthly bonus for 5+ substitutions",
    balanceAfter: 43,
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    _id: "5",
    type: "earned",
    amount: 2,
    description: "Substituted for Prof. Michael Chen - Database Systems",
    balanceAfter: 38,
    createdAt: "2026-01-28T11:00:00Z",
  },
  {
    _id: "6",
    type: "used",
    amount: 1,
    description: "Auto-assignment for Web Development class",
    balanceAfter: 36,
    createdAt: "2026-01-25T16:45:00Z",
  },
  {
    _id: "7",
    type: "earned",
    amount: 2,
    description: "Substituted for Dr. Robert Brown - Software Engineering",
    balanceAfter: 37,
    createdAt: "2026-01-20T10:00:00Z",
  },
];

const dummyLeaderboard = [
  {
    _id: "1",
    name: "Dr. Emily Williams",
    department: "Computer Science",
    credits: 52,
  },
  {
    _id: "2",
    name: "Dr. John Smith",
    department: "Computer Science",
    credits: 45,
  },
  {
    _id: "3",
    name: "Prof. Sarah Johnson",
    department: "Information Technology",
    credits: 42,
  },
  {
    _id: "4",
    name: "Prof. Michael Chen",
    department: "Computer Science",
    credits: 38,
  },
  {
    _id: "5",
    name: "Dr. Lisa Anderson",
    department: "Data Science",
    credits: 35,
  },
];

const MyCredits = () => {
  const [balance] = useState(dummyBalance);
  const [stats] = useState(dummyStats);
  const [transactions] = useState(dummyTransactions);
  const [leaderboard] = useState(dummyLeaderboard);
  const [loading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const getTransactionIcon = (type) => {
    switch (type) {
      case "earned":
        return <TrendingUp className="icon-earned" size={20} />;
      case "used":
        return <TrendingDown className="icon-used" size={20} />;
      case "bonus":
        return <Award className="icon-bonus" size={20} />;
      case "penalty":
        return <TrendingDown className="icon-penalty" size={20} />;
      default:
        return <Coins size={20} />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="my-credits">
      <div className="credits-header">
        <h1>My Credits</h1>
      </div>

      {/* Credit Balance Card */}
      <div className="balance-card">
        <div className="balance-info">
          <div className="balance-icon">
            <Coins size={40} />
          </div>
          <div className="balance-details">
            <p className="balance-label">Current Balance</p>
            <h2 className="balance-amount">{balance?.credits || 0}</h2>
            <p className="balance-name">{balance?.name}</p>
          </div>
        </div>
        <div className="balance-stats">
          <div className="stat-item">
            <p className="stat-label">Substitutions Taken</p>
            <p className="stat-value">{stats?.totalSubstitutionsTaken || 0}</p>
          </div>
          <div className="stat-item">
            <p className="stat-label">Substitutions Given</p>
            <p className="stat-value">{stats?.totalSubstitutionsGiven || 0}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === "transactions" ? "active" : ""}`}
          onClick={() => setActiveTab("transactions")}
        >
          Transactions
        </button>
        <button
          className={`tab ${activeTab === "leaderboard" ? "active" : ""}`}
          onClick={() => setActiveTab("leaderboard")}
        >
          Leaderboard
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="overview-section">
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Lifetime Earned</h4>
              <p className="stat-number">
                {stats?.lifetimeStats?.earned?.total || 0}
              </p>
              <span className="stat-count">
                {stats?.lifetimeStats?.earned?.count || 0} transactions
              </span>
            </div>
            <div className="stat-card">
              <h4>Lifetime Used</h4>
              <p className="stat-number">
                {stats?.lifetimeStats?.used?.total || 0}
              </p>
              <span className="stat-count">
                {stats?.lifetimeStats?.used?.count || 0} transactions
              </span>
            </div>
            <div className="stat-card">
              <h4>This Month</h4>
              <p className="stat-number">
                +{stats?.thisMonthStats?.earned?.total || 0}
              </p>
              <span className="stat-count">
                -{stats?.thisMonthStats?.used?.total || 0} used
              </span>
            </div>
          </div>

          <div className="recent-transactions">
            <h3>Recent Transactions</h3>
            {transactions.length === 0 ? (
              <p className="no-data">No transactions yet</p>
            ) : (
              <div className="transaction-list">
                {transactions.slice(0, 5).map((tx) => (
                  <div key={tx._id} className="transaction-item">
                    <div className="transaction-icon">
                      {getTransactionIcon(tx.type)}
                    </div>
                    <div className="transaction-details">
                      <p className="transaction-type">{tx.type}</p>
                      <p className="transaction-desc">{tx.description}</p>
                      <p className="transaction-date">
                        {formatDate(tx.createdAt)}
                      </p>
                    </div>
                    <div
                      className={`transaction-amount ${
                        tx.type === "earned" || tx.type === "bonus"
                          ? "positive"
                          : "negative"
                      }`}
                    >
                      {tx.type === "earned" || tx.type === "bonus" ? "+" : "-"}
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="transactions-section">
          <h3>All Transactions</h3>
          {transactions.length === 0 ? (
            <p className="no-data">No transactions yet</p>
          ) : (
            <div className="transaction-list full">
              {transactions.map((tx) => (
                <div key={tx._id} className="transaction-item">
                  <div className="transaction-icon">
                    {getTransactionIcon(tx.type)}
                  </div>
                  <div className="transaction-details">
                    <p className="transaction-type">{tx.type}</p>
                    <p className="transaction-desc">{tx.description}</p>
                    <p className="transaction-date">
                      {formatDate(tx.createdAt)}
                    </p>
                  </div>
                  <div className="transaction-balance">
                    <p
                      className={`transaction-amount ${
                        tx.type === "earned" || tx.type === "bonus"
                          ? "positive"
                          : "negative"
                      }`}
                    >
                      {tx.type === "earned" || tx.type === "bonus" ? "+" : "-"}
                      {tx.amount}
                    </p>
                    <p className="balance-after">Balance: {tx.balanceAfter}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "leaderboard" && (
        <div className="leaderboard-section">
          <h3>Top Faculties by Credits</h3>
          <div className="leaderboard-list">
            {leaderboard.map((faculty, index) => (
              <div
                key={faculty._id}
                className={`leaderboard-item ${
                  faculty._id === "2" ? "current-user" : ""
                }`}
              >
                <div className="rank">{index + 1}</div>
                <div className="faculty-info">
                  <p className="faculty-name">{faculty.name}</p>
                  <p className="faculty-dept">{faculty.department}</p>
                </div>
                <div className="faculty-credits">
                  <Coins size={16} />
                  <span>{faculty.credits}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCredits;
