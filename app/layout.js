import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Husin Dashboard",
  description: "Automated Shop Management",
};

// Change to async function
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex font-sans antialiased">
        <Sidebar />
        <main className="flex-1 bg-gray-50 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
