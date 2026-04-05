"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MentionsLegales() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
              Juridique
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight mb-6">
              Mentions légales
            </h1>
            <div className="w-16 h-[2px] bg-zinc-950" />
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Éditeur */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                1. Éditeur du site
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-2">
                <p>
                  Le site{" "}
                  <strong className="text-zinc-950">mlondevice.fr</strong> est
                  édité par :
                </p>
                <ul className="list-none space-y-1 pl-0">
                  <li>
                    <strong className="text-zinc-950">Raison sociale :</strong>{" "}
                    ML ON DEVICE SASU
                  </li>
                  <li>
                    <strong className="text-zinc-950">Forme juridique :</strong>{" "}
                    Société par Actions Simplifiée Unipersonnelle (SASU)
                  </li>
                  <li>
                    <strong className="text-zinc-950">Siège social :</strong> 60
                    Rue François 1er, 75008 Paris, France
                  </li>
                  <li>
                    <strong className="text-zinc-950">SIREN :</strong> 102 185
                    550
                  </li>
                  <li>
                    <strong className="text-zinc-950">RCS :</strong> Paris
                  </li>
                  <li>
                    <strong className="text-zinc-950">Président :</strong> Max
                    Levy
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Directeur de la publication :
                    </strong>{" "}
                    Max Levy
                  </li>
                  <li>
                    <strong className="text-zinc-950">Email :</strong>{" "}
                    <a
                      href="mailto:contact@mlondevice.fr"
                      className="underline hover:text-zinc-950 transition-colors"
                    >
                      contact@mlondevice.fr
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* Hébergeur */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                2. Hébergement
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-2">
                <p>Le site est hébergé par :</p>
                <ul className="list-none space-y-1 pl-0">
                  <li>
                    <strong className="text-zinc-950">Google LLC</strong> —
                    Firebase Hosting
                  </li>
                  <li>1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</li>
                  <li>
                    Site web :{" "}
                    <a
                      href="https://firebase.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-zinc-950 transition-colors"
                    >
                      firebase.google.com
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                3. Propriété intellectuelle
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  L&apos;ensemble du contenu du site mlondevice.fr — incluant,
                  de manière non limitative, les textes, graphismes, images,
                  logos, icônes, sons, logiciels et tout autre élément — est la
                  propriété exclusive de ML ON DEVICE SASU, sauf mention
                  contraire.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication,
                  adaptation ou exploitation de tout ou partie des éléments du
                  site, quel que soit le moyen ou le procédé utilisé, est
                  interdite sans l&apos;autorisation écrite préalable de ML ON
                  DEVICE SASU.
                </p>
                <p>
                  Toute exploitation non autorisée du site ou de l&apos;un
                  quelconque des éléments qu&apos;il contient sera considérée
                  comme constitutive d&apos;une contrefaçon et poursuivie
                  conformément aux articles L.335-2 et suivants du Code de la
                  Propriété Intellectuelle.
                </p>
              </div>
            </section>

            {/* Limitation de responsabilité */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                4. Limitation de responsabilité
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  ML ON DEVICE SASU s&apos;efforce d&apos;assurer
                  l&apos;exactitude et la mise à jour des informations diffusées
                  sur le site. Toutefois, elle ne peut garantir l&apos;exactitude,
                  la précision ou l&apos;exhaustivité des informations mises à
                  disposition.
                </p>
                <p>
                  ML ON DEVICE SASU décline toute responsabilité pour toute
                  imprécision, inexactitude ou omission portant sur des
                  informations disponibles sur le site, ainsi que pour tous
                  dommages résultant d&apos;une intrusion frauduleuse d&apos;un
                  tiers ayant entraîné une modification des informations mises à
                  disposition sur le site.
                </p>
              </div>
            </section>

            {/* Liens hypertextes */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                5. Liens hypertextes
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  Le site mlondevice.fr peut contenir des liens vers d&apos;autres
                  sites internet. ML ON DEVICE SASU n&apos;exerce aucun contrôle
                  sur ces sites et décline toute responsabilité quant à leur
                  contenu ou aux traitements de données personnelles qu&apos;ils
                  opèrent.
                </p>
                <p>
                  La mise en place de liens hypertextes vers le site
                  mlondevice.fr est autorisée sans demande préalable, à condition
                  que cette pratique ne porte pas atteinte aux intérêts de ML ON
                  DEVICE SASU.
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                6. Droit applicable
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  Les présentes mentions légales sont régies par le droit
                  français. En cas de litige, et après tentative de recherche
                  d&apos;une solution amiable, compétence est attribuée aux
                  tribunaux compétents de Paris.
                </p>
              </div>
            </section>

            {/* Crédits */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                7. Crédits
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-2">
                <p>
                  <strong className="text-zinc-950">
                    Conception et développement :
                  </strong>{" "}
                  ML ON DEVICE SASU
                </p>
                <p>
                  <strong className="text-zinc-950">Technologies :</strong>{" "}
                  Next.js, Tailwind CSS, Firebase
                </p>
              </div>
            </section>
          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-zinc-200">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              &larr; Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
