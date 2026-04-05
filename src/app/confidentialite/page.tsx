"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PolitiqueConfidentialite() {
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
              Politique de confidentialité
            </h1>
            <div className="w-16 h-[2px] bg-zinc-950" />
            <p className="text-sm text-zinc-500 mt-6">
              Dernière mise à jour : 5 avril 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                1. Introduction
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  ML ON DEVICE SASU, dont le siège social est situé au 60 Rue
                  François 1er, 75008 Paris, France, attache une grande
                  importance à la protection de vos données personnelles.
                </p>
                <p>
                  La présente politique de confidentialité décrit la manière dont
                  nous collectons, utilisons et protégeons vos informations
                  lorsque vous utilisez notre site internet{" "}
                  <strong className="text-zinc-950">mlondevice.fr</strong>,
                  conformément au Règlement Général sur la Protection des Données
                  (RGPD) et à la loi Informatique et Libertés.
                </p>
              </div>
            </section>

            {/* Responsable du traitement */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                2. Responsable du traitement
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-2">
                <p>Le responsable du traitement des données est :</p>
                <ul className="list-none space-y-1 pl-0">
                  <li>
                    <strong className="text-zinc-950">ML ON DEVICE SASU</strong>
                  </li>
                  <li>60 Rue François 1er, 75008 Paris, France</li>
                  <li>
                    Email :{" "}
                    <a
                      href="mailto:contact@mlondevice.fr"
                      className="underline hover:text-zinc-950 transition-colors"
                    >
                      contact@mlondevice.fr
                    </a>
                  </li>
                  <li>Représenté par Max Levy, Président</li>
                </ul>
              </div>
            </section>

            {/* Données collectées */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                3. Données collectées
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  Nous collectons les données suivantes dans le cadre de
                  l&apos;utilisation de notre site :
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-950 mb-2">
                      3.1 Données fournies volontairement
                    </h3>
                    <p>
                      Lorsque vous remplissez le formulaire de contact, nous
                      collectons :
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Nom et prénom</li>
                      <li>Adresse email</li>
                      <li>Numéro de téléphone</li>
                      <li>Nom de l&apos;entreprise (facultatif)</li>
                      <li>Budget estimé</li>
                      <li>Message / description du projet</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-zinc-950 mb-2">
                      3.2 Données collectées automatiquement
                    </h3>
                    <p>
                      Lors de votre navigation, des données techniques peuvent
                      être collectées automatiquement :
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Adresse IP</li>
                      <li>Type et version du navigateur</li>
                      <li>Pages consultées et durée de la visite</li>
                      <li>Date et heure de connexion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Finalités */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                4. Finalités du traitement
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>Vos données personnelles sont utilisées pour :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-zinc-950">
                      Répondre à vos demandes :
                    </strong>{" "}
                    traitement des messages envoyés via le formulaire de contact
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Établir des devis :
                    </strong>{" "}
                    élaboration de propositions commerciales adaptées à votre
                    projet
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Améliorer notre site :
                    </strong>{" "}
                    analyse de la fréquentation et optimisation de
                    l&apos;expérience utilisateur
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Respecter nos obligations légales :
                    </strong>{" "}
                    conservation des données requise par la loi
                  </li>
                </ul>
                <p>
                  La base légale du traitement est votre{" "}
                  <strong className="text-zinc-950">consentement</strong>{" "}
                  (formulaire de contact) et notre{" "}
                  <strong className="text-zinc-950">intérêt légitime</strong>{" "}
                  (amélioration du site et relation commerciale).
                </p>
              </div>
            </section>

            {/* Conservation */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                5. Durée de conservation
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  Vos données personnelles sont conservées pendant une durée
                  proportionnée à la finalité pour laquelle elles ont été
                  collectées :
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-zinc-950">
                      Données de contact :
                    </strong>{" "}
                    3 ans à compter du dernier échange
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Données de navigation :
                    </strong>{" "}
                    13 mois maximum
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Données contractuelles :
                    </strong>{" "}
                    5 ans après la fin de la relation commerciale (obligation
                    légale)
                  </li>
                </ul>
              </div>
            </section>

            {/* Partage */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                6. Partage des données
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  Vos données personnelles ne sont jamais vendues à des tiers.
                  Elles peuvent être partagées avec :
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-zinc-950">
                      Google Firebase :
                    </strong>{" "}
                    hébergement du site et stockage sécurisé des données du
                    formulaire de contact (serveurs situés dans l&apos;Union
                    Européenne — europe-west1)
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Autorités compétentes :
                    </strong>{" "}
                    uniquement sur demande légale ou judiciaire
                  </li>
                </ul>
                <p>
                  Google LLC adhère au EU-U.S. Data Privacy Framework, assurant
                  un niveau de protection adéquat pour les transferts de données.
                </p>
              </div>
            </section>

            {/* Sécurité */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                7. Sécurité des données
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  Nous mettons en œuvre les mesures techniques et
                  organisationnelles appropriées pour protéger vos données :
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Chiffrement SSL/TLS de toutes les communications</li>
                  <li>
                    Accès restreint aux données (authentification requise pour
                    l&apos;administration)
                  </li>
                  <li>
                    Règles de sécurité Firestore limitant l&apos;accès aux
                    données
                  </li>
                  <li>Hébergement sur infrastructure Google Cloud sécurisée</li>
                </ul>
              </div>
            </section>

            {/* Droits */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                8. Vos droits
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  Conformément au RGPD, vous disposez des droits suivants
                  concernant vos données personnelles :
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-zinc-950">Droit d&apos;accès :</strong>{" "}
                    obtenir la confirmation que vos données sont traitées et en
                    recevoir une copie
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Droit de rectification :
                    </strong>{" "}
                    corriger des données inexactes ou incomplètes
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Droit à l&apos;effacement :
                    </strong>{" "}
                    demander la suppression de vos données
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Droit à la limitation :
                    </strong>{" "}
                    restreindre le traitement de vos données
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Droit à la portabilité :
                    </strong>{" "}
                    recevoir vos données dans un format structuré
                  </li>
                  <li>
                    <strong className="text-zinc-950">
                      Droit d&apos;opposition :
                    </strong>{" "}
                    vous opposer au traitement de vos données
                  </li>
                </ul>
                <p>
                  Pour exercer ces droits, contactez-nous à{" "}
                  <a
                    href="mailto:contact@mlondevice.fr"
                    className="underline hover:text-zinc-950 transition-colors"
                  >
                    contact@mlondevice.fr
                  </a>
                  . Nous nous engageons à répondre dans un délai de 30 jours.
                </p>
                <p>
                  Vous disposez également du droit d&apos;introduire une
                  réclamation auprès de la{" "}
                  <strong className="text-zinc-950">CNIL</strong> (Commission
                  Nationale de l&apos;Informatique et des Libertés) — 3 Place de
                  Fontenoy, TSA 80715, 75334 Paris Cedex 07 —{" "}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-zinc-950 transition-colors"
                  >
                    www.cnil.fr
                  </a>
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                9. Cookies
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  Le site mlondevice.fr utilise uniquement des cookies techniques
                  strictement nécessaires au fonctionnement du site. Ces cookies
                  ne nécessitent pas votre consentement préalable conformément à
                  la réglementation en vigueur.
                </p>
                <p>
                  Aucun cookie publicitaire ou de traçage n&apos;est utilisé sur
                  ce site.
                </p>
                <p>
                  Vous pouvez à tout moment configurer votre navigateur pour
                  refuser les cookies. Toutefois, le refus de cookies techniques
                  peut limiter l&apos;accès à certaines fonctionnalités du site.
                </p>
              </div>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                10. Modifications
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  ML ON DEVICE SASU se réserve le droit de modifier la présente
                  politique de confidentialité à tout moment. En cas de
                  modification substantielle, la date de mise à jour sera
                  actualisée en haut de cette page.
                </p>
                <p>
                  Nous vous invitons à consulter régulièrement cette page pour
                  prendre connaissance des éventuelles modifications.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight mb-4">
                11. Contact
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  Pour toute question relative à cette politique de
                  confidentialité ou à vos données personnelles, contactez-nous :
                </p>
                <ul className="list-none space-y-1 pl-0">
                  <li>
                    <strong className="text-zinc-950">Email :</strong>{" "}
                    <a
                      href="mailto:contact@mlondevice.fr"
                      className="underline hover:text-zinc-950 transition-colors"
                    >
                      contact@mlondevice.fr
                    </a>
                  </li>
                  <li>
                    <strong className="text-zinc-950">Adresse :</strong> ML ON
                    DEVICE SASU — 60 Rue François 1er, 75008 Paris, France
                  </li>
                </ul>
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
