"use client";

import { useState } from "react";

export default function CreateBundlePage() {
  const [name, setName] = useState("");
  const [products, setProducts] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/bundles/create", {
      method: "POST",
      body: JSON.stringify({
        name,
        products: products.split(",").map(p => p.trim())
      })
    });
    alert("Bundle created");
    setName("");
    setProducts("");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Bundle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Bundle name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Comma-separated product IDs"
          value={products}
          onChange={e => setProducts(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
