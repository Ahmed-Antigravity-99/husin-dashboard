export default function StatusBadge({ status }) {
  const colors = {
    approved: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
    template: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${colors[status] || "bg-gray-50"}`}>
      {status ? status.toUpperCase() : "UNKNOWN"}
    </span>
  );
}
