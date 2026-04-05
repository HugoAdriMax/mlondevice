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
                href="/blog"
                className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors w-fit"
              >
                Blog
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
