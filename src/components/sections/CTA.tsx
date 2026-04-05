"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative z-10 bg-zinc-950 pt-32 pb-20 border-t border-zinc-900"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-zinc-800"></div>
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Prêt à démarrer ?
          </span>
          <div className="h-px w-8 bg-zinc-800"></div>
        </div>

        {/* Heading */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-8">
          Donnons vie à <br className="hidden sm:block" />
          <span className="text-zinc-500 font-serif italic font-light tracking-normal">
            votre
          </span>{" "}
          projet.
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium mb-12 leading-relaxed">
          Que vous ayez une idée précise ou besoin de conseils, nous sommes là
          pour vous accompagner. Discutons de votre projet et trouvons ensemble
          la meilleure solution.
        </p>

        {/* Action Button & Note */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
          <Link href="/contact">
            <button className="group flex items-center justify-between gap-6 px-8 py-5 bg-white text-zinc-950 hover:bg-zinc-200 transition-colors duration-300 w-full sm:w-auto">
              <span className="text-sm font-semibold uppercase tracking-widest">
                Demander un devis gratuit
              </span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </Link>
          <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
            Réponse sous 24h garantie
          </span>
        </div>

        {/* Trust Row */}
        <div className="pt-16 border-t border-zinc-900">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-8">
            Ils nous font confiance
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
            {["Startups", "PME", "Entrepreneurs"].map((client, i) => (
              <span
                key={i}
                className="text-xl md:text-2xl font-black tracking-tighter text-zinc-600 hover:text-white transition-colors duration-300 cursor-default"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
