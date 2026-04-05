"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { articles } from "@/data/articles";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const categoryColors: Record<string, string> = {
  Web: "bg-blue-50 text-blue-700 border-blue-200",
  Mobile: "bg-purple-50 text-purple-700 border-purple-200",
  Design: "bg-amber-50 text-amber-700 border-amber-200",
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default function BlogPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-zinc-950"></div>
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                Blog
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950 leading-[1.1] mb-6">
              Conseils &{" "}
              <span className="text-zinc-400 font-serif italic font-light tracking-normal">
                expertise
              </span>
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed font-medium">
              Articles et guides pratiques sur le développement web, les
              applications mobiles et le digital. Pour vous aider à faire les
              bons choix.
            </p>
          </div>

          {/* Featured Article */}
          <Link href={`/blog/${featured.slug}`} className="block group mb-16">
            <div className="border border-zinc-200 p-8 md:p-12 hover:border-zinc-950 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 border ${
                    categoryColors[featured.category] || "bg-zinc-50 text-zinc-700 border-zinc-200"
                  }`}
                >
                  {featured.category}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {formatDate(featured.date)}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {featured.readTime}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-950 mb-4 group-hover:text-zinc-600 transition-colors">
                {featured.title}
              </h2>
              <p className="text-base text-zinc-500 leading-relaxed font-medium max-w-2xl mb-6">
                {featured.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-950">
                Lire l&apos;article
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block border border-zinc-200 p-6 md:p-8 hover:border-zinc-950 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 border ${
                      categoryColors[article.category] || "bg-zinc-50 text-zinc-700 border-zinc-200"
                    }`}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-black tracking-tight text-zinc-950 mb-3 group-hover:text-zinc-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-4">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">
                    {formatDate(article.date)}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
