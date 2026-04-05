"use client";

import { useState } from "react";
import { MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Envoyer les données à Firestore
      await addDoc(collection(db, "contacts"), {
        name: formState.name,
        email: formState.email,
        phone: formState.phone || null,
        subject: formState.subject,
        message: formState.message,
        createdAt: serverTimestamp(),
        read: false,
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("Erreur lors de l'envoi:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Contact Section */}
        <section className="relative z-10 bg-white border-t border-zinc-200 pt-24 pb-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            {/* Header */}
            <div className="max-w-3xl mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-zinc-950"></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                  Contact
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950 leading-[1.1] mb-6">
                Parlons de{" "}
                <span className="text-zinc-400 font-serif italic font-light tracking-normal">
                  votre
                </span>{" "}
                projet
              </h1>
              <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                Une idée, un projet, une question ? N'hésitez pas à nous
                contacter. Nous vous répondons sous 24h.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              {/* Left: Contact Info */}
              <div className="lg:col-span-5 flex flex-col gap-12">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-950 mb-8">
                    Informations de contact
                  </h2>

                  <div className="flex flex-col gap-8">
                    {/* Location */}
                    <div className="flex items-start gap-6 group">
                      <div className="w-12 h-12 border border-zinc-200 flex items-center justify-center shrink-0 group-hover:bg-zinc-950 group-hover:text-white transition-colors duration-300">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-950 mb-1">
                          Localisation
                        </p>
                        <p className="text-zinc-600 font-medium">
                          Paris, France
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horaires Box */}
                <div className="p-8 border border-zinc-200 bg-zinc-50/50">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-950 mb-4">
                    Horaires
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                    Lundi - Vendredi : 9h00 - 18h00
                    <br />
                    Réponse garantie sous 24h
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-7">
                {isSubmitted ? (
                  <div className="h-full flex items-center justify-center border border-zinc-200 p-12">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-zinc-950 text-white flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight text-zinc-950 mb-2">
                        Message envoyé !
                      </h3>
                      <p className="text-zinc-600 font-medium">
                        Merci pour votre message. Nous vous répondrons dans les
                        plus brefs délais.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {error && (
                      <div className="md:col-span-2 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                      </div>
                    )}

                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-950">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Votre nom"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 focus:ring-0 transition-colors rounded-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-950">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="votre@email.com"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 focus:ring-0 transition-colors rounded-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-950">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+33 6 00 00 00 00"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 focus:ring-0 transition-colors rounded-none"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-950">
                        Sujet *
                      </label>
                      <select
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-white border border-zinc-200 text-zinc-950 focus:outline-none focus:border-zinc-950 focus:ring-0 transition-colors rounded-none cursor-pointer"
                        required
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="web">Création de site web</option>
                        <option value="mobile">Application mobile</option>
                        <option value="design">UI/UX Design</option>
                        <option value="other">Autre demande</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-3 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-950">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Décrivez votre projet..."
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 focus:ring-0 transition-colors resize-none rounded-none"
                        required
                      />
                    </div>

                    <div className="md:col-span-2 mt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="group w-full flex items-center justify-between gap-4 px-8 py-6 bg-zinc-950 text-white hover:bg-zinc-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="text-sm font-semibold uppercase tracking-widest">
                          {isLoading ? "Envoi en cours..." : "Envoyer le message"}
                        </span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
