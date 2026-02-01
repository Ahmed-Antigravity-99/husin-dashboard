"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Boxes, Settings } from "lucide-react";

export default function Sidebar() {
  const path = usePathname();

  // FIX: Removed the ": string" type annotation
  const linkClass = (href) =>
    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      path === href 
        ? "bg-blue-600 text-white shadow-md" 
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 flex flex-col fixed left-0 top-0 h-full">
      <div className="mb-8 px-4 py-2">
        <h1 className="text-xl font-bold text-blue-600 tracking-tight">Husin Dashboard</h1>
      </div>

      <nav className="space-y-2 flex-1">
        <Link href="/" className={linkClass("/")}>
          <LayoutDashboard size={20} />
          <span className="font-medium">Overview</span>
        </Link>
        <Link href="/products" className={linkClass("/products")}>
          <Package size={20} />
          <span className="font-medium">Products</span>
        </Link>
        <Link href="/bundles" className={linkClass("/bundles")}>
          <Boxes size={20} />
          <span className="font-medium">Bundles</span>
        </Link>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <Link href="/settings" className={linkClass("/settings")}>
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
