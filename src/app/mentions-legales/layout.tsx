import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales - ML ON DEVICE",
  description:
    "Mentions légales du site mlondevice.fr. Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation.",
  alternates: {
    canonical: "https://mlondevice.fr/mentions-legales",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
