"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col bg-white">
      {/* Background Texture (Ultra fine dot grid for premium feel) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Main Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-32 pb-24">
        <div
          className={`transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-zinc-950"></div>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
              Studio de développement sur mesure
            </span>
          </div>

          {/* Huge Editorial Headline */}
          <h1 className="text-[3.5rem] leading-[1] sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter text-zinc-950 mb-10 max-w-6xl">
            <span className="block sm:inline">Transformons</span>{" "}
            <span className="block sm:inline">vos{" "}
              <span className="text-zinc-400 font-serif italic font-light tracking-normal">
                idées
              </span>
            </span>{" "}
            <span className="block sm:inline">en réalité.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
            {/* Description */}
            <div className="md:col-span-5 lg:col-span-4">
              <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                Développement web & mobile. Du concept à la mise en production,
                nous créons des expériences digitales conçues pour performer et
                marquer les esprits.
              </p>
            </div>

            {/* Actions */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col sm:flex-row gap-4 sm:justify-end">
              <Link href="/contact">
                <button className="group flex items-center justify-between gap-6 px-8 py-5 bg-zinc-950 text-white hover:bg-zinc-800 transition-colors duration-300">
                  <span className="text-sm font-semibold uppercase tracking-widest">
                    Lancer un projet
                  </span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Stats Bar */}
      <div className="relative z-10 border-t border-zinc-200 bg-zinc-50/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-200 border-x border-zinc-200">
            {[
              { value: "50+", label: "Projets livrés" },
              { value: "100%", label: "Satisfaction" },
              { value: "24h", label: "Réponse rapide" },
              { value: "25+", label: "Apps en production" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-8 md:p-12 flex flex-col justify-center transition-all duration-1000 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950 mb-4">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
