"use client"; // 1. This MUST be the first line

import { use, useState } from "react";
import { auth } from "@/lib/firebase"; // Ensure this path matches your client-side config
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage({ searchParams }) {
  // 2. In Next.js 15 Client Components, we unwrap the searchParams promise using React's use()
  const params = use(searchParams);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      // 3. The Handshake: Authenticate with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      // 4. Success! Send the user to the dashboard
      router.push("/dashboard"); 
    } catch (err) {
      console.error("Login failed:", err.message);
      // Give the user a friendly error message
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Admin Login</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@husin.com" 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition-colors"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
