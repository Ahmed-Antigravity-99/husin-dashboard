"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const linkClass = (href: string) =>
    `block px-4 py-2 rounded ${
      path === href ? "bg-blue-600 text-white" : "hover:bg-gray-200"
    }`;

  return (
    <div className="w-64 h-screen border-r p-4">
      <h2 className="text-xl font-bold mb-6">HUSIN Admin</h2>

      <nav className="flex flex-col gap-2">
        <Link href="/" className={linkClass("/")}>
          Dashboard
        </Link>

        <Link href="/products" className={linkClass("/products")}>
          Products
        </Link>

        <Link href="/bundles" className={linkClass("/bundles")}>
          Bundles
        </Link>

        <Link href="/settings" className={linkClass("/settings")}>
          Settings
        </Link>
      </nav>
    </div>
  );
}
