import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { articles, getArticleBySlug } from "@/data/articles";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} - ML ON DEVICE`,
    description: article.description,
    alternates: {
      canonical: `https://mlondevice.fr/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://mlondevice.fr/blog/${article.slug}`,
      type: "article",
      publishedTime: article.date,
    },
  };
}

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

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-xl font-black text-zinc-950 tracking-tight mt-10 mb-4"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="text-base font-bold text-zinc-950 mt-6 mb-3"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="text-sm font-bold text-zinc-950 mt-4 mb-1">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("**")) {
      const text = line.replace(/\*\*(.*?)\*\*/g, "|||$1|||");
      const parts = text.split("|||");
      elements.push(
        <p key={i} className="text-sm text-zinc-600 leading-relaxed mb-3">
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="text-zinc-950 font-bold">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className="space-y-2 mb-4 ml-1">
          {listItems.map((item, j) => (
            <li
              key={j}
              className="text-sm text-zinc-600 leading-relaxed flex items-start gap-3"
            >
              <span className="w-1.5 h-1.5 bg-zinc-950 rounded-full mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        listItems.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-2 mb-4 ml-1">
          {listItems.map((item, j) => {
            const text = item.replace(/\*\*(.*?)\*\*/g, "|||$1|||");
            const parts = text.split("|||");
            return (
              <li
                key={j}
                className="text-sm text-zinc-600 leading-relaxed flex items-start gap-3"
              >
                <span className="text-xs font-bold text-zinc-950 mt-0.5 shrink-0 w-5">
                  {j + 1}.
                </span>
                <span>
                  {parts.map((part, k) =>
                    k % 2 === 1 ? (
                      <strong key={k} className="text-zinc-950 font-bold">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      );
      continue;
    } else if (line.trim() === "") {
      // skip empty lines
    } else {
      const text = line.replace(/\*\*(.*?)\*\*/g, "|||$1|||");
      const parts = text.split("|||");
      elements.push(
        <p key={i} className="text-sm text-zinc-600 leading-relaxed mb-3">
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="text-zinc-950 font-bold">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }

    i++;
  }

  return elements;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const relatedArticles = articles
    .filter((a) => a.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-20">
        <article className="max-w-[800px] mx-auto px-6 md:px-12">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 border ${
                  categoryColors[article.category] ||
                  "bg-zinc-50 text-zinc-700 border-zinc-200"
                }`}
              >
                {article.category}
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {formatDate(article.date)}
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight leading-[1.15] mb-6">
              {article.title}
            </h1>
            <p className="text-base text-zinc-500 leading-relaxed font-medium">
              {article.description}
            </p>
            <div className="w-16 h-[2px] bg-zinc-950 mt-8" />
          </header>

          {/* Content */}
          <div className="mb-16">{renderContent(article.content)}</div>

          {/* CTA */}
          <div className="border border-zinc-200 p-8 md:p-10 mb-16">
            <h3 className="text-lg font-black text-zinc-950 tracking-tight mb-3">
              Vous avez un projet ?
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6">
              Discutons de votre projet. Nous vous répondons sous 24h avec un
              devis gratuit et personnalisé.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
            >
              <span className="text-sm font-semibold uppercase tracking-widest">
                Nous contacter
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-950 mb-6">
              Articles similaires
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block border border-zinc-200 p-6 hover:border-zinc-950 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-semibold uppercase tracking-widest px-2 py-0.5 border ${
                        categoryColors[related.category] ||
                        "bg-zinc-50 text-zinc-700 border-zinc-200"
                      }`}
                    >
                      {related.category}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {related.readTime}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-950 mb-2 group-hover:text-zinc-600 transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
