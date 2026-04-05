"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Globe,
  Smartphone,
  Palette,
  Server,
  LineChart,
  Headphones,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Sites Web",
    desc: "Sites vitrines, e-commerce, applications web sur mesure avec les dernières technologies.",
    tags: ["Next.js / React", "Design responsive", "SEO optimisé", "Performance maximale"],
  },
  {
    icon: Smartphone,
    title: "Applications Mobiles",
    desc: "Apps iOS et Android natives ou cross-platform pour toucher tous vos utilisateurs.",
    tags: ["React Native", "Flutter", "iOS natif", "Android natif"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Interfaces intuitives et expériences utilisateur mémorables qui convertissent.",
    tags: ["Wireframes", "Prototypes", "Design system", "Tests utilisateurs"],
  },
  {
    icon: Server,
    title: "Backend & API",
    desc: "Architectures robustes et scalables pour supporter votre croissance.",
    tags: ["Node.js", "Firebase", "PostgreSQL", "API REST / GraphQL"],
  },
  {
    icon: LineChart,
    title: "Analytics & Optimisation",
    desc: "Suivi des performances et optimisation continue de vos produits digitaux.",
    tags: ["Google Analytics", "A/B Testing", "Heatmaps", "Conversion"],
  },
  {
    icon: Headphones,
    title: "Support & Maintenance",
    desc: "Accompagnement continu pour assurer la pérennité de vos solutions.",
    tags: ["Mises à jour", "Monitoring", "Support réactif", "Évolutions"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-10 bg-white border-t border-zinc-200 pt-24 pb-24"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-zinc-950"></div>
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                Expertise
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950 leading-[1.1]">
              Des solutions <br className="hidden md:block" />
              <span className="text-zinc-400 font-serif italic font-light tracking-normal">
                complètes.
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-8 max-w-sm">
            <p className="text-lg text-zinc-600 leading-relaxed font-medium lg:text-right">
              De l'idée à la mise en production, nous vous accompagnons à chaque
              étape.
            </p>
            <Link href="/services">
              <button className="group flex items-center justify-between gap-4 px-6 py-4 bg-zinc-950 text-white hover:bg-zinc-800 transition-colors duration-300 w-full sm:w-auto">
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Tous les services
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Architectural Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-zinc-200">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-8 md:p-10 lg:p-12 border-r border-b border-zinc-200 hover:bg-zinc-50 transition-colors duration-300 group flex flex-col h-full"
            >
              {/* Brutalist Icon Box */}
              <div className="w-12 h-12 bg-zinc-950 text-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ease-out shrink-0">
                <service.icon className="w-5 h-5 stroke-[1.5]" />
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-zinc-950 mb-4">
                {service.title}
              </h3>

              <p className="text-sm text-zinc-600 leading-relaxed font-medium mb-10 flex-1">
                {service.desc}
              </p>

              {/* Tech Tags - Brutalist style */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1.5 border border-zinc-200 text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
