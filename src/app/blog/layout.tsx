import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Conseils & Expertise Développement Web & Mobile",
  description:
    "Articles, conseils et guides sur le développement web, les applications mobiles, le design et le digital. Par ML ON DEVICE, agence à Paris.",
  keywords: [
    "blog développement web",
    "conseils application mobile",
    "guide création site web",
    "React Native",
    "coût application mobile",
  ],
  alternates: {
    canonical: "https://mlondevice.fr/blog",
  },
  openGraph: {
    title: "Blog - ML ON DEVICE",
    description:
      "Articles et conseils sur le développement web & mobile par ML ON DEVICE.",
    url: "https://mlondevice.fr/blog",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
