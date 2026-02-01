"use client";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        // Only redirect if we are SURE there is no user session
        router.replace("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="p-10 text-center">Verifying Admin Session...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Husin Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">Logged in as: {user?.email}</p>
      {/* Rest of your dashboard content */}
    </div>
  );
}
