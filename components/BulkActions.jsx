"use client";

export default function BulkActions({ selected }) {
  const handleAction = async (action) => {
    if (!confirm(`Apply ${action} to ${selected.length} items?`)) return;
    
    await fetch(`/api/products/${action}`, {
      method: "POST",
      body: JSON.stringify({ ids: selected }),
    });
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-4 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
      <span className="text-sm font-medium text-blue-700">
        {selected.length} items selected
      </span>
      <div className="h-4 w-px bg-blue-200 mx-2" />
      <button
        onClick={() => handleAction("approve")}
        disabled={selected.length === 0}
        className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-md disabled:bg-gray-300 transition-all"
      >
        Approve
      </button>
      <button
        onClick={() => handleAction("reject")}
        disabled={selected.length === 0}
        className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-md disabled:bg-gray-300 transition-all"
      >
        Reject
      </button>
    </div>
  );
}
