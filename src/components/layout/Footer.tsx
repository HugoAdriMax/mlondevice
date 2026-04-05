"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-white border-t border-zinc-200 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 mb-16">
          {/* Brand & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/">
              <span className="font-bold tracking-[0.15em] text-sm uppercase text-zinc-950 mb-5 block">
                ML ON DEVICE
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-6 max-w-xs">
              Solutions digitales innovantes pour transformer vos idées en
              réalité.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-all duration-300 group"
            >
              <svg
                className="w-4 h-4 group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-950 mb-5">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors w-fit"
              >
                Accueil
              </Link>
              <Link
                href="/services"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors w-fit"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors w-fit"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Légal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-950 mb-5">
              Légal
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/mentions-legales"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors w-fit"
              >
                Mentions légales
              </Link>
              <Link
                href="/confidentialite"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors w-fit"
              >
                Politique de confidentialité
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-zinc-500">
            © {currentYear} ML ON DEVICE. Tous droits réservés.
          </p>
          <p className="text-xs font-medium text-zinc-500">
            Conçu avec passion par Max Levy
          </p>
        </div>
      </div>
    </footer>
  );
}
