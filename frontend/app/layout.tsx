import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Navbar } from "@/components/Navbar";
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
        className={`${inter.variable} ${manrope.variable} antialiased min-h-screen flex flex-col font-sans bg-[#0D0D0D] text-white`}
      >
        <Navbar />

        {/* Page Container */}
        <main className="flex-1 w-full pt-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-white/5 py-12 mt-auto bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-[#5B0E14] to-[#F1E194]" />
              <span className="text-sm font-bold tracking-tight text-white font-heading">
                Aura<span className="text-[#F1E194]">Loan</span>
              </span>
            </div>
            <p className="text-sm text-gray-500">© 2026 Aura Credit Systems. Precision Intelligence for Modern Finance.</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
