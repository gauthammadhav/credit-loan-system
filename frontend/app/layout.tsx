import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura Credit | Premium Loan Approval",
  description: "AI-powered credit loan approval & fraud detection platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${manrope.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Navbar Placeholder */}
        <header className="w-full border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <h1 className="text-xl font-bold font-heading text-white tracking-wide">
              AURA<span className="text-[#F1E194]">CREDIT</span>
            </h1>
            <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
              <span className="hover:text-white transition-colors cursor-pointer">Dashboard</span>
              <span className="hover:text-white transition-colors cursor-pointer">Apply</span>
              <span className="hover:text-white transition-colors cursor-pointer">Review</span>
            </nav>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Footer Placeholder */}
        <footer className="w-full border-t border-white/5 py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">© 2026 Aura Credit Systems. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
