"use client";

export default function BulkActions({ selected }) {
  const approve = async () => {
    await fetch("/api/products/approve", {
      method: "POST",
      body: JSON.stringify({ ids: selected }),
    });
    location.reload();
  };

  const reject = async () => {
    await fetch("/api/products/reject", {
      method: "POST",
      body: JSON.stringify({ ids: selected }),
    });
    location.reload();
  };

  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={approve}
        disabled={selected.length === 0}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300"
      >
        Approve Selected
      </button>

      <button
        onClick={reject}
        disabled={selected.length === 0}
        className="px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-300"
      >
        Reject Selected
      </button>
    </div>
  );
}
