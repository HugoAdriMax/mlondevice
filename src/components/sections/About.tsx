"use client";

import { Code2, Rocket, Zap, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Code de qualité",
    desc: "Technologies modernes et bonnes pratiques pour des applications performantes et maintenables.",
  },
  {
    icon: Rocket,
    title: "Livraison rapide",
    desc: "Processus agile et communication transparente pour respecter vos délais.",
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Optimisation poussée pour des expériences utilisateur fluides et réactives.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité",
    desc: "Protection des données et bonnes pratiques de sécurité intégrées dès la conception.",
  },
];

export default function About() {
  return (
    <>
      {/* About / Features Section */}
      <section
        id="apropos"
        className="relative z-10 bg-white border-t border-zinc-200 pt-24 pb-0"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-zinc-950"></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                  À propos
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950 leading-[1.1]">
                Une approche centrée sur vos{" "}
                <span className="text-zinc-400 font-serif italic font-light tracking-normal">
                  besoins.
                </span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                ML ON DEVICE accompagne les entreprises et entrepreneurs dans leur
                transformation digitale. De la conception à la mise en production,
                nous créons des solutions sur mesure qui répondent à vos enjeux
                métier.
              </p>
            </div>
          </div>

          {/* Architectural Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-zinc-200">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-8 md:p-10 border-r border-b border-zinc-200 hover:bg-zinc-50 transition-colors duration-300 group"
              >
                {/* Brutalist Icon Box */}
                <div className="w-12 h-12 bg-zinc-950 text-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ease-out">
                  <feature.icon className="w-5 h-5 stroke-[1.5]" />
                </div>

                <h3 className="text-xl font-bold tracking-tight text-zinc-950 mb-4">
                  {feature.title}
                </h3>

                <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="fondateur" className="relative z-10 bg-white pt-24 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col items-start">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-zinc-950"></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                  Le Fondateur
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-950 mb-1">
                  Max Levy
                </h3>
                <span className="text-base text-zinc-500 font-medium">
                  Fondateur & CEO
                </span>
              </div>

              {/* Editorial Quote */}
              <blockquote className="relative mb-10">
                <p className="text-xl md:text-2xl leading-[1.4] font-medium text-zinc-950">
                  "Mon objectif est d'apporter, à travers mes solutions
                  digitales, des outils{" "}
                  <span className="font-serif italic font-light text-zinc-500">
                    innovants
                  </span>{" "}
                  qui répondent aux{" "}
                  <span className="font-serif italic font-light text-zinc-500">
                    véritables
                  </span>{" "}
                  besoins des entreprises et utilisateurs."
                </p>
              </blockquote>

              {/* Mission & Vision */}
              <div className="flex flex-col sm:flex-row gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-950 mb-2">
                    Mission
                  </h4>
                  <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                    Créer des outils digitaux qui simplifient la vie.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-950 mb-2">
                    Vision
                  </h4>
                  <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                    Un écosystème de solutions pour chaque besoin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
