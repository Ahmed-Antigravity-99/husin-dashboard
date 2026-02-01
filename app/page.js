"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // This watches for the user's login status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If they are logged in, send them to the dashboard
        router.push("/dashboard");
      } else {
        // If they are not logged in, send them to the login page
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-white font-medium">Entering Husin Network...</p>
      </div>
    </div>
  );
}
