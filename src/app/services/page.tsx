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
  Check,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const services = [
  {
    icon: Globe,
    title: "Sites Web",
    desc: "Sites vitrines, e-commerce, applications web sur mesure avec les dernières technologies.",
    features: [
      "Next.js / React",
      "Design responsive",
      "SEO optimisé",
      "Performance maximale",
      "CMS intégré",
      "Analytics",
    ],
    price: "À partir de 1 500€",
  },
  {
    icon: Smartphone,
    title: "Applications Mobiles",
    desc: "Apps iOS et Android natives ou cross-platform pour toucher tous vos utilisateurs.",
    features: [
      "React Native",
      "Flutter",
      "iOS natif",
      "Android natif",
      "Push notifications",
      "Stores deployment",
    ],
    price: "À partir de 3 000€",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Interfaces intuitives et expériences utilisateur mémorables qui convertissent.",
    features: [
      "Wireframes",
      "Prototypes Figma",
      "Design system",
      "Tests utilisateurs",
      "Responsive design",
      "Accessibilité",
    ],
    price: "À partir de 800€",
  },
  {
    icon: Server,
    title: "Backend & API",
    desc: "Architectures robustes et scalables pour supporter votre croissance.",
    features: [
      "Node.js",
      "Firebase",
      "PostgreSQL",
      "API REST / GraphQL",
      "Authentification",
      "Sécurité",
    ],
    price: "Sur devis",
  },
  {
    icon: LineChart,
    title: "Analytics & Optimisation",
    desc: "Suivi des performances et optimisation continue de vos produits digitaux.",
    features: [
      "Google Analytics",
      "A/B Testing",
      "Heatmaps",
      "Conversion",
      "Reporting",
      "KPIs",
    ],
    price: "À partir de 500€",
  },
  {
    icon: Headphones,
    title: "Support & Maintenance",
    desc: "Accompagnement continu pour assurer la pérennité de vos solutions.",
    features: [
      "Mises à jour",
      "Monitoring 24/7",
      "Support réactif",
      "Évolutions",
      "Backups",
      "Sécurité",
    ],
    price: "À partir de 200€/mois",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Services Section */}
        <section className="relative z-10 bg-white border-t border-zinc-200 pt-24 pb-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-12 bg-zinc-950"></div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                    Nos Services
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950 leading-[1.1]">
                  Des solutions <br className="hidden md:block" />
                  <span className="text-zinc-400 font-serif italic font-light tracking-normal">
                    sur mesure.
                  </span>
                </h1>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-8 max-w-sm">
                <p className="text-lg text-zinc-600 leading-relaxed font-medium lg:text-right">
                  De l'idée à la mise en production, nous vous accompagnons à
                  chaque étape avec des services adaptés à vos besoins et votre
                  budget.
                </p>
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

                  <h2 className="text-2xl font-bold tracking-tight text-zinc-950 mb-4">
                    {service.title}
                  </h2>

                  <p className="text-sm text-zinc-600 leading-relaxed font-medium mb-10">
                    {service.desc}
                  </p>

                  {/* Features List */}
                  <ul className="flex flex-col gap-3 mb-12 flex-1">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm text-zinc-600 font-medium"
                      >
                        <Check
                          className="w-4 h-4 text-emerald-600 shrink-0"
                          strokeWidth={3}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price Divider & Tag */}
                  <div className="pt-6 border-t border-zinc-200 mt-auto">
                    <span className="text-sm font-bold text-zinc-950 tracking-wide">
                      {service.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 bg-zinc-950 pt-24 pb-24">
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-8">
              Un projet en{" "}
              <span className="text-zinc-500 font-serif italic font-light tracking-normal">
                tête ?
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium mb-12 leading-relaxed">
              Discutons de vos besoins et trouvons ensemble la meilleure
              solution pour votre projet.
            </p>

            {/* Action Button */}
            <Link href="/contact">
              <button className="group flex items-center justify-between gap-6 px-8 py-5 bg-white text-zinc-950 hover:bg-zinc-200 transition-colors duration-300 mx-auto">
                <span className="text-sm font-semibold uppercase tracking-widest">
                  Demander un devis gratuit
                </span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
