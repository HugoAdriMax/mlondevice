"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-24 flex justify-between items-center">
          {/* Logo text minimaliste */}
          <Link href="/" className="flex items-center cursor-pointer">
            <span className="font-bold tracking-[0.15em] text-sm uppercase text-zinc-950">
              ML ON DEVICE
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
                  pathname === item.href
                    ? "text-zinc-950"
                    : "text-zinc-400 hover:text-zinc-950"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Call to Action */}
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-950 hover:opacity-60 transition-opacity"
            >
              Démarrer un projet
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-zinc-950"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-28"
          >
            <div className="flex flex-col items-center gap-10 p-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-bold uppercase tracking-[0.15em] ${
                      pathname === item.href ? "text-zinc-950" : "text-zinc-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="mt-6 flex items-center gap-4 px-8 py-5 bg-zinc-950 text-white font-bold uppercase tracking-[0.15em] text-sm">
                    Démarrer un projet
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
