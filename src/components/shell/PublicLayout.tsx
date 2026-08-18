import Link from "next/link";
import { Box } from "lucide-react";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-900)] text-white flex flex-col relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-blue-500)]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[var(--color-cyan-400)]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Navigation */}
      <header className="h-20 border-b border-white/5 backdrop-blur-md bg-transparent fixed top-0 w-full z-50 px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--color-blue-500)] to-[var(--color-purple-500)] flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(45,124,255,0.4)] transition-all">
            <Box size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-wide text-glow-primary">
            BHARAT-GRID
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/auth/signin" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden md:block">
            Sign In
          </Link>
          <Link href="/auth/signup" className="text-sm font-semibold text-white bg-[var(--color-blue-500)] hover:bg-[#1E5FCE] px-5 py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(45,124,255,0.3)] hover:shadow-[0_0_20px_rgba(45,124,255,0.5)]">
            Start Building
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20 relative z-10">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-sm text-gray-500 relative z-10 backdrop-blur-sm bg-black/20">
        &copy; {new Date().getFullYear()} Bharat-Grid. All rights reserved.
      </footer>
    </div>
  );
}
