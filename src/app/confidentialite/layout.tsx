import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité - ML ON DEVICE",
  description:
    "Politique de confidentialité du site mlondevice.fr. Informations sur la collecte et le traitement de vos données personnelles.",
  alternates: {
    canonical: "https://mlondevice.fr/confidentialite",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
