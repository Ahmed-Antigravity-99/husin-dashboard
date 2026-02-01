import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Husin Network Admin",
  description: "Secure Management Dashboard for Husin Network",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* The {children} is where your login page or dashboard 
            will be "injected." This setup allows for smooth 
            transitions between routes.
        */}
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
