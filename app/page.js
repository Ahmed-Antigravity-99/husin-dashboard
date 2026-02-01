"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase"; // Ensure this points to your client config
import { onAuthStateChanged } from "firebase/auth";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // 1. This listener is the secret to stopping the "Loop"
    // It waits for Firebase to check the browser's cookies
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 2. If a session exists, send them straight to the dashboard
        router.push("/dashboard");
      } else {
        // 3. If no session, send them to the login gate
        router.push("/login");
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <div className="text-center">
        {/* Simple loader so the user doesn't see a blank white screen */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto"></div>
        <p className="mt-4 text-sm font-medium text-gray-400 tracking-widest uppercase">
          Initializing Husin Network...
        </p>
      </div>
    </div>
  );
}
