# ML ON DEVICE - Contexte du Projet

## Vue d'ensemble
Site vitrine pour **ML ON DEVICE**, agence de développement web & mobile basée à Paris, fondée par **Max Levy**.

**URL Production:** https://mlondevice.fr
**Firebase Project:** mlondevice-17e0a

## Stack Technique
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** Geist Sans + Geist Mono
- **Icons:** Lucide React
- **Backend:** Firebase (Firestore + Hosting + Auth)
- **Déploiement:** Firebase Hosting (europe-west1)

## Structure du Projet

```
src/
├── app/
│   ├── layout.tsx          # Layout principal + SEO + JSON-LD
│   ├── page.tsx            # Page d'accueil
│   ├── services/
│   │   ├── page.tsx        # Page services détaillée
│   │   └── layout.tsx      # SEO services
│   ├── contact/
│   │   ├── page.tsx        # Formulaire de contact (Firestore)
│   │   └── layout.tsx      # SEO contact
│   └── admin/
│       ├── page.tsx        # Dashboard admin (messages)
│       ├── login/page.tsx  # Login admin
│       └── layout.tsx      # noindex/nofollow
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navigation
│   │   └── Footer.tsx      # Pied de page
│   ├── sections/
│   │   ├── Hero.tsx        # Section héro avec stats
│   │   ├── About.tsx       # À propos + Fondateur
│   │   ├── Services.tsx    # Grille des services
│   │   ├── CTA.tsx         # Call to action
│   │   └── Projects.tsx    # (Non utilisé actuellement)
│   └── ui/                 # Composants UI réutilisables
├── contexts/
│   └── AuthContext.tsx     # Authentification Firebase
└── lib/
    └── firebase.ts         # Config Firebase
```

## Pages

### Page d'accueil (/)
- Hero avec titre "Transformons vos idées en réalité"
- Stats: 50+ projets, 100% satisfaction, 24h réponse, 25+ apps
- Section À propos avec features
- Section Fondateur (Max Levy, sans photo)
- Services aperçu
- CTA

### Page Services (/services)
- Liste complète des services avec tarifs
- Catégories: Sites web, Apps mobiles, Solutions sur mesure

### Page Contact (/contact)
- Formulaire qui envoie vers Firestore (collection `contacts`)
- Champs: nom, email, téléphone, entreprise, budget, message

### Admin (/admin)
- Login avec Firebase Auth
- Dashboard pour voir les messages de contact
- Protégé par AuthContext

## Firebase

### Firestore Rules
```
contacts:
  - create: ouvert à tous (formulaire public)
  - read/update/delete: authentifié uniquement
```

### Commandes de déploiement
```bash
npm run build
firebase deploy --project mlondevice-17e0a
```

Pour déployer uniquement les rules:
```bash
firebase deploy --only firestore:rules --project mlondevice-17e0a
```

## SEO
- Metadata complète dans layout.tsx
- Open Graph + Twitter Cards
- JSON-LD Schema.org (ProfessionalService)
- Sitemap.xml avec toutes les pages
- robots.txt bloque /admin et /api
- Favicon SVG avec "ML"

## Design
- Style éditorial/architectural minimaliste
- Couleurs: zinc-950 (noir), zinc-400 (gris), blanc
- Typographie: font-black pour titres, font-serif italic pour accents
- Animations subtiles au scroll

## Notes importantes
- Le titre Hero est sur 3 lignes en mobile (block sm:inline)
- Photo du fondateur masquée (retirée complètement)
- Stats mises à jour: 50+ projets, 25+ apps en production
- Google Search Console: remplacer `VOTRE_CODE_GOOGLE_SEARCH_CONSOLE` dans layout.tsx

## Pour continuer le développement
1. Cloner le repo
2. `npm install`
3. `npm run dev` pour le développement
4. `npm run build && firebase deploy --project mlondevice-17e0a` pour la prod
