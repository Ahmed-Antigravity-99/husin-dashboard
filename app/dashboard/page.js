"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This listener is essential. It waits for the session to load.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsChecking(false); // We found the user, stay here!
      } else {
        router.push("/login"); // Truly no user, go away.
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isChecking) {
    return <div className="h-screen flex items-center justify-center font-bold">Verifying Session...</div>;
  }

  return (
    <div className="p-10">
      <h1>Welcome to your Husin Dashboard!</h1>
      {/* Dashboard content here */}
    </div>
  );
}
