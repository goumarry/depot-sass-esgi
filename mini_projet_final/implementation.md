Mini-Projet CSS – Innovatech Solutions
Contexte
Site vitrine d'une startup fictive avec 4 sections : Accueil, Nos Services, Médias, À propos.
Approche retenue : Sass (architecture 7-1) + HTML vanilla avec une touche d'animation CSS moderne.

Architecture des fichiers
mini_projet_final/
├── index.html
├── sass/
│   ├── abstracts/
│   │   ├── _variables.scss   ← design tokens (couleurs, typo, spacing)
│   │   ├── _mixins.scss      ← flex-center, card-hover, respond-to
│   │   └── _functions.scss   ← contrast-check, rem()
│   ├── base/
│   │   ├── _reset.scss
│   │   └── _typography.scss
│   ├── layout/
│   │   ├── _header.scss
│   │   ├── _nav.scss
│   │   └── _footer.scss
│   ├── components/
│   │   ├── _cards.scss
│   │   ├── _buttons.scss
│   │   └── _badges.scss
│   ├── sections/
│   │   ├── _hero.scss
│   │   ├── _services.scss
│   │   ├── _medias.scss
│   │   └── _about.scss
│   ├── themes/
│   │   └── _dark.scss        ← dark mode via data-theme="dark"
│   └── main.scss             ← point d'entrée, @use de tous les partials
├── css/
│   └── main.css              ← compilé depuis Sass
├── rapport.md
└── package.json              ← sass comme devDependency + script build
Choix techniques
Variables Sass pour les design tokens (couleurs, typographie, breakpoints)
Mixins réutilisables : respond-to, card-hover, flex-center, button-style
Fonctions Sass : rem() pour la typographie, vérification de contraste
7-1 pattern (simplifié) pour l'organisation des partials
Dark mode via data-theme="dark" sur <html> + JS toggle
Grid CSS pour les grilles de cartes (responsive : 1 → 2 → 3 colonnes)
Animations : hover élévation cartes, fade-in sections
Icônes : SVG inline (Heroicons)
Rapport (Partie 2)
Format .md
~1000 mots, ton étudiant M1, première personne
Structure : Intro → Sass → Tailwind → Mixte → Comparatif → Justification → Conclusion