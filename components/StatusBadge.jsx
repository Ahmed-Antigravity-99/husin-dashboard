export default function StatusBadge({ status }) {
  const colors = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    template: "bg-gray-200 text-gray-600",
  };

  return (
    <span className={`px-2 py-1 rounded text-sm ${colors[status] || ""}`}>
      {status}
    </span>
  );
}
