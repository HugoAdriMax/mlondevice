"use client";

import Image from "next/image";
import { ArrowUpRight, Rocket } from "lucide-react";

export default function Projects() {
  return (
    <section
      id="projets"
      className="relative z-10 bg-zinc-50/30 border-t border-zinc-200 pt-24 pb-24"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-zinc-950"></div>
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                Portfolio
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950 leading-[1.1]">
              Nos <br className="hidden md:block" />
              <span className="text-zinc-400 font-serif italic font-light tracking-normal">
                projets.
              </span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-lg text-zinc-600 leading-relaxed font-medium">
              Découvrez nos réalisations et les solutions que nous avons créées.
            </p>
          </div>
        </div>

        {/* Project 1: FIXIT */}
        <a
          href="https://apps.apple.com/fr/app/fixit/id6757300129"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-zinc-200 bg-white group hover:border-zinc-950 transition-colors duration-500">
            {/* Visual Side (Image) */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-zinc-200 relative min-h-[300px] lg:min-h-[500px] overflow-hidden">
              <Image
                src="/fixit-app.jpg"
                alt="FIXIT App"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay with tagline */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col items-center justify-end p-12 md:p-20 text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white mb-4 max-w-lg leading-tight">
                  Trouvez un artisan indépendant près de chez vous.
                </h3>
                <p className="text-white/80 font-medium tracking-wide uppercase text-sm">
                  Compte 100% gratuit
                </p>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              <div className="absolute top-8 right-8 w-12 h-12 border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-950 group-hover:text-white group-hover:border-zinc-950 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
                Application Mobile
              </span>

              <h4 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-950 mb-6">
                FIXIT
              </h4>

              <p className="text-zinc-600 leading-relaxed font-medium mb-12">
                Application de mise en relation entre prestataires de services et
                particuliers. Un modèle ubérisé pour trouver rapidement un
                professionnel qualifié.
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {["iOS", "React Native", "Firebase", "UX Design"].map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 border border-zinc-200 text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-50/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </a>

        {/* Bientôt disponible */}
        <div className="mt-12 border border-zinc-200 border-dashed p-12 md:p-24 flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-sm hover:bg-white hover:border-zinc-300 transition-colors duration-300">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
            Bientôt disponible
          </span>
          <h4 className="text-2xl md:text-3xl font-black tracking-tighter text-zinc-950 mb-4">
            D'autres projets{" "}
            <span className="font-serif italic font-light text-zinc-400">
              arrivent...
            </span>
          </h4>
          <p className="text-zinc-600 font-medium max-w-md">
            Nous travaillons actuellement sur de nouvelles solutions innovantes.
            Restez connectés !
          </p>
        </div>
      </div>
    </section>
  );
}
