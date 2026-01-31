"use client";

import { useMemo, useState } from "react";
import BulkActions from "./BulkActions";
import StatusBadge from "./StatusBadge";

const PAGE_SIZE = 20;

export default function ProductTable({ products }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [minProfit, setMinProfit] = useState("");
  const [sortField, setSortField] = useState<"price_sar" | "profit_sar" | "title">(
    "profit_sar"
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
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

  const toggle = (id: string) => {
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

  const changeSort = (field: "price_sar" | "profit_sar" | "title") => {
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
        <div>
          <label className="block text-sm mb-1">Search</label>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border px-2 py-1 rounded w-64"
            placeholder="Title or URL..."
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c || "Uncategorized"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Brand</label>
          <select
            value={brandFilter}
            onChange={(e) => {
              setBrandFilter(e.target.value);
              setPage(1);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="">All</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b || "Unknown"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Min Profit (SAR)</label>
          <input
            value={minProfit}
            onChange={(e) => {
              setMinProfit(e.target.value);
              setPage(1);
            }}
            className="border px-2 py-1 rounded w-24"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Sort by</label>
          <select
            value={sortField}
            onChange={(e) =>
              setSortField(e.target.value as "price_sar" | "profit_sar" | "title")
            }
            className="border px-2 py-1 rounded"
          >
            <option value="profit_sar">Profit</option>
            <option value="price_sar">Price</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Direction</label>
          <select
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value as "asc" | "desc")}
            className="border px-2 py-1 rounded"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-2">
        Showing {pageItems.length} of {filtered.length} filtered products (total:{" "}
        {products.length})
      </div>

      <table className="w-full border mt-2 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">
              <input
                type="checkbox"
                checked={
                  pageItems.length > 0 &&
                  pageItems.every((p) => selected.includes(p.id))
                }
                onChange={toggleAll}
              />
            </th>
            <th className="p-2">Image</th>
            <th className="p-2 cursor-pointer" onClick={() => changeSort("title")}>
              Title
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => changeSort("price_sar")}
            >
              Price
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => changeSort("profit_sar")}
            >
              Profit
            </th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {pageItems.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selected.includes(p.id)}
                  onChange={() => toggle(p.id)}
                />
              </td>

              <td className="p-2">
                {p.images?.[0] ? (
                  <img
                    src={p.images[0]}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  "—"
                )}
              </td>

              <td className="p-2">
                <a
                  href={`/products/${p.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {p.title}
                </a>
              </td>

              <td className="p-2">{p.price_sar} SAR</td>
              <td className="p-2">{p.profit_sar} SAR</td>
              <td className="p-2">
                <StatusBadge status={p.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center gap-4 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
