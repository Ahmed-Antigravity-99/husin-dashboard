"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase"; // Your client-side firebase config
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        // Only redirect if we are CERTAIN there is no user
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl animate-pulse">Checking credentials...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      {/* Your actual dashboard content */}
    </div>
  );
}
