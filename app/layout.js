import "./globals.css";

export const metadata = {
  title: "HUSIN Dashboard",
  description: "Admin dashboard for product approvals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
