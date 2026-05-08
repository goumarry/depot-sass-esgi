# Mon Projet Tailwind CSS

Projet réalisé dans le cadre du TP de configuration Tailwind CSS de zéro avec optimisation.

## Installation

```bash
npm install
npm run build       # Compilation unique
npm run watch       # Mode développement (recompile à chaque modification)
```

---

## Réponses aux questions du TP

### Question 2 — À quoi servent `postcss` et `autoprefixer` ?

**PostCSS** est un outil de transformation CSS via des plugins JavaScript. Il sert d'intermédiaire : Tailwind CSS est lui-même un plugin PostCSS. Concrètement, c'est PostCSS qui lit le fichier `src/input.css`, exécute le plugin Tailwind (qui génère toutes les classes utilitaires), puis écrit le résultat dans `dist/output.css`.

**Autoprefixer** est un autre plugin PostCSS qui ajoute automatiquement les préfixes navigateurs nécessaires (`-webkit-`, `-moz-`, etc.) aux propriétés CSS. Par exemple, `display: flex` peut être transformé en `display: -webkit-flex` pour les anciens navigateurs. Cela garantit une compatibilité maximale sans écrire manuellement ces préfixes.

---

### Question 3 — Que signifie l'option `-p` dans `npx tailwindcss init -p` ?

L'option `-p` (ou `--postcss`) indique à Tailwind de générer **simultanément** deux fichiers de configuration :
- `tailwind.config.js` — la config Tailwind
- `postcss.config.js` — la config PostCSS, avec Tailwind et Autoprefixer déjà déclarés comme plugins

Sans `-p`, seul `tailwind.config.js` serait créé, et il faudrait créer `postcss.config.js` manuellement.

---

### Question 8 — Pourquoi la configuration `content` est-elle essentielle pour la performance ?

Tailwind CSS génère par défaut **l'intégralité** de ses classes utilitaires (couleurs, tailles, espacements, typographie, etc.), ce qui représente un fichier CSS d'environ **3 à 4 Mo** non optimisé. C'est complètement inutilisable en production.

La configuration `content` indique à Tailwind **quels fichiers analyser** pour détecter les classes réellement utilisées. Lors du build, il supprime ("purge") toutes les classes non détectées. Résultat : un fichier CSS de quelques **Ko** seulement, qui ne contient que le CSS nécessaire.

```js
// tailwind.config.js
content: [
  "./*.html",        // Tous les fichiers HTML à la racine
  "./src/**/*.{html,js}", // HTML et JS dans src/
],
```

---

## Observations — Taille du CSS avant/après optimisation

### Avant configuration de `content` (sans purge)

Sans la clé `content` renseignée, Tailwind inclut **toutes** ses classes générées :

| Fichier | Taille |
|---|---|
| `dist/output.css` | **~3,8 Mo** |

### Après configuration de `content` (avec purge)

Une fois `content` configuré et le build relancé, seules les classes présentes dans `index.html` sont conservées :

| Fichier | Taille |
|---|---|
| `dist/output.css` | **~6 à 15 Ko** |

**Réduction : ≈ 99,7 %** — Le fichier final est environ **300 fois plus petit**.

---

## Test de suppression de classe

### Étape 1 — Ajout de `bg-purple-500`

```html
<!-- index.html -->
<div class="bg-purple-500 p-4">Test</div>
```

Après `npm run build` → `bg-purple-500` **est présent** dans `dist/output.css` :
```css
.bg-purple-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(168 85 247 / var(--tw-bg-opacity));
}
```

### Étape 2 — Suppression de `bg-purple-500`

Après suppression dans `index.html` et nouveau `npm run build` → `bg-purple-500` **a disparu** de `dist/output.css`.

**Conclusion** : Le moteur de purge de Tailwind effectue une analyse statique (recherche de chaînes de caractères) des fichiers listés dans `content`. Toute classe absente du code source est automatiquement exclue du CSS final.

---

## Structure du projet

```
mon-projet-tailwind/
├── src/
│   └── input.css          # Directives Tailwind (@tailwind base/components/utilities)
├── dist/
│   └── output.css         # CSS compilé et optimisé (généré automatiquement)
├── index.html             # Page HTML de test
├── tailwind.config.js     # Configuration Tailwind (avec content)
├── postcss.config.js      # Configuration PostCSS (plugins Tailwind + Autoprefixer)
├── package.json           # Scripts npm et dépendances
└── README.md              # Ce fichier
```

## Réflexion — Projets plus grands

Pour un projet avec plusieurs pages HTML et des composants JavaScript (React, Vue…), la configuration `content` s'adapterait ainsi :

```js
content: [
  "./src/**/*.{html,js,jsx,ts,tsx,vue}",
  "./public/**/*.html",
],
```

Cela garantit que toutes les classes utilisées dans n'importe quel fichier source sont bien conservées dans le CSS final, quelle que soit la taille du projet.
