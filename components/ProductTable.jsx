"use client";

import { useMemo, useState } from "react";
import BulkActions from "./BulkActions";
import StatusBadge from "./StatusBadge";

const PAGE_SIZE = 20;

export default function ProductTable({ products = [] }) {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [minProfit, setMinProfit] = useState("");
  const [sortField, setSortField] = useState("profit_sar");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
    [products]
  );

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand).filter(Boolean))),
    [products]
  );

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.source_url?.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) {
      list = list.filter((p) => p.category === categoryFilter);
    }

    if (brandFilter) {
      list = list.filter((p) => p.brand === brandFilter);
    }

    if (minProfit) {
      const min = parseFloat(minProfit) || 0;
      list = list.filter((p) => (p.profit_sar || 0) >= min);
    }

    list.sort((a, b) => {
      const av = a[sortField] || 0;
      const bv = b[sortField] || 0;

      if (sortField === "title") {
        const as = (a.title || "").toLowerCase();
        const bs = (b.title || "").toLowerCase();
        if (as < bs) return sortDir === "asc" ? -1 : 1;
        if (as > bs) return sortDir === "asc" ? 1 : -1;
        return 0;
      }

      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [products, search, categoryFilter, brandFilter, minProfit, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    const ids = pageItems.map((p) => p.id);
    if (ids.every((id) => selected.includes(id))) {
      setSelected((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelected((prev) => Array.from(new Set([...prev, ...ids])));
    }
  };

  const changeSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  return (
    <div>
      <BulkActions selected={selected} />

      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase mb-1">Search</label>
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="border p-2 rounded w-64 bg-white"
            placeholder="Title or URL..."
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            className="border p-2 rounded bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase mb-1">Min Profit (SAR)</label>
          <input
            type="number"
            value={minProfit}
            onChange={(e) => { setMinProfit(e.target.value); setPage(1); }}
            className="border p-2 rounded w-32 bg-white"
            placeholder="0"
          />
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4"><input type="checkbox" onChange={toggleAll} checked={pageItems.length > 0 && pageItems.every(p => selected.includes(p.id))} /></th>
              <th className="p-4">Image</th>
              <th className="p-4 cursor-pointer hover:text-blue-600" onClick={() => changeSort("title")}>Title</th>
              <th className="p-4 cursor-pointer hover:text-blue-600" onClick={() => changeSort("price_sar")}>Price</th>
              <th className="p-4 cursor-pointer hover:text-blue-600" onClick={() => changeSort("profit_sar")}>Profit</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-4"><input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggle(p.id)} /></td>
                <td className="p-4">
                  {p.images?.[0] ? <img src={p.images[0]} className="w-12 h-12 rounded object-cover" alt="" /> : "—"}
                </td>
                <td className="p-4">
                  <a href={`/products/${p.id}`} className="text-blue-600 font-medium hover:underline">{p.title}</a>
                </td>
                <td className="p-4">{p.price_sar} SAR</td>
                <td className="p-4 text-green-600 font-bold">{p.profit_sar} SAR</td>
                <td className="p-4"><StatusBadge status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 border rounded disabled:opacity-30">Prev</button>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 border rounded disabled:opacity-30">Next</button>
        </div>
      </div>
    </div>
  );
}
