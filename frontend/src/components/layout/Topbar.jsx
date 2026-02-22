export default function Topbar() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, Dr. Morgan</p>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        + Apply Leave
      </button>
    </div>
  );
}
