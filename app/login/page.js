"use client";

import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      location.href = "/products";
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="border rounded p-6 w-80 flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold">HUSIN Admin Login</h1>

        <input
          type="password"
          className="border px-2 py-1 rounded"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
