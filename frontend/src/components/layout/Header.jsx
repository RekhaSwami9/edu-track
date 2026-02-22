import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3">
      <h2 className="text-xl font-semibold">Welcome back, Dr. Morgan</h2>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
