"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Force redirect to login
    router.push("/login");
  }, [router]);

  return (
    <div className="bg-black text-white h-screen flex items-center justify-center">
      <h1>Redirecting to Husin Network...</h1>
    </div>
  );
}
