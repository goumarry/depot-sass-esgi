# Rendu TP : Structuration d'un Projet Sass (Pattern 7-1) & Intégration Tailwind CSS

---

## 1. Requêtes formulées à l'IA (Parties 1 et 2)

Pour m'aider à mettre en place la structure de base et comprendre l'ordre d'importation, j'ai formulé les requêtes suivantes à l'IA :

> *"Agis comme un expert en architecture CSS. Peux-tu me lister les 7 dossiers composant le pattern Sass 7-1 ainsi que son fichier principal, en m'expliquant le rôle général de chaque dossier en une seule phrase claire pour un débutant ?"*

> *"Génère-moi le code exact pour importer tous les dossiers du pattern 7-1 dans un fichier `main.scss`. Précise-moi de manière concise pourquoi l'ordre de ces imports est crucial pour le bon fonctionnement de la cascade CSS."*

---

## 2. Interaction et Réflexion sur l'intégration de Tailwind (Partie 3.1)

### Question posée à l'IA

> *"Dans un projet web moderne où j'utilise Tailwind CSS pour la majorité de mes styles utilitaires, comment le pattern Sass 7-1 classique doit-il être adapté ou optimisé pour coexister de manière pertinente, sans faire doublon avec ce que Tailwind fait déjà ?"*

### Analyse de la réponse de l'IA

L'IA a mis en évidence un point très juste : l'utilisation de Tailwind rend une grande partie du pattern 7-1 traditionnel obsolète ou redondante. Elle m'a suggéré de vider presque totalement les dossiers `base/` et `layout/`, car Tailwind intègre déjà un reset performant (**Preflight**) et gère parfaitement les structures de page avec ses classes utilitaires (Flexbox, Grid). Je valide totalement cette approche pour éviter les conflits de styles.

Cependant, l'IA laissait entendre que la gestion des thèmes (`themes/`) ou des composants (`components/`) devenait superflue grâce aux directives `@apply` de Tailwind. **Je conteste ce point** : l'abus du `@apply` est un anti-pattern dans Tailwind. De plus, pour des composants très riches en interactions ou nécessitant de la logique (boucles, mathématiques), la puissance native de Sass reste indispensable pour garder un code lisible et maintenable. J'ai donc décidé de conserver l'architecture complète, mais de réadapter strictement le rôle de chaque dossier.

---

## 3. Justifications des catégories du pattern 7-1 avec Tailwind (Partie 3.2)

Voici comment je justifie le maintien de chaque dossier et ce que j'y placerais prioritairement dans un contexte où Tailwind est présent :

| Dossier | Justification | Exemple concret |
|---|---|---|
| `abstracts/` | Tailwind ne gère pas la logique algorithmique. Ce dossier reste indispensable pour les mixins complexes ou les fonctions Sass. | Un mixin `@mixin stagger-delay($count)` contenant une boucle `@for` pour générer des délais d'animation dynamiques. |
| `vendors/` | Totalement indispensable. Tailwind ne peut pas styliser les bibliothèques tierces. | Surcharger les styles CSS par défaut de **SwiperJS** ou **FullCalendar**. |
| `base/` | Très allégé grâce au **Preflight** de Tailwind. Conservé pour des resets très profonds ou spécifiques au projet. | Personnaliser les barres de défilement (`::-webkit-scrollbar`) ou la couleur de sélection (`::selection`). |
| `layout/` | Quasiment inutile avec Tailwind. Conservé uniquement pour des cas extrêmes. | Une grille CSS Grid asymétrique ou un *Bento layout* extrêmement complexe qui rendrait le HTML illisible avec des dizaines de classes utilitaires. |
| `components/` | Le cœur de l'utilisation de Sass en complément de Tailwind. Permet d'éviter le *"Utility-hell"* sur les éléments très complexes. | Une carte de tarification avec des effets de **glassmorphism**, des pseudo-éléments `::before`/`::after` et des animations complexes au survol. |
| `pages/` | Utile pour isoler du CSS qui ne concerne strictement qu'une seule vue, évitant d'alourdir le bundle global. | Une animation de type **parallaxe** très lourde, uniquement présente sur la page d'accueil (`_home.scss`). |
| `themes/` | Pertinent si le projet va au-delà du simple *Dark Mode* géré nativement par Tailwind. | Un site en marque blanche nécessitant 5 ou 6 palettes de couleurs différentes (Thème "Hiver", Thème "Noël", etc.) via des **maps Sass** complexes. |

---

## 4. Scénario Concret : Le Bouton Dégradé (Partie 3.3)

### Où placer ces styles et pourquoi ?

Je placerais ces styles dans le dossier `components/`, spécifiquement dans un fichier **`_button.scss`**.

Bien que Tailwind puisse gérer les bases du bouton (`padding`, `border-radius`, `font-weight`), gérer un dégradé très spécifique et surtout le ciblage d'un élément enfant interactif (changer la couleur du `<svg>` interne lors du `:hover` sur le bouton parent) devient très verbeux en Tailwind. Il faudrait utiliser des classes arbitraires complexes comme `group` sur le parent et `group-hover:[&>svg]:fill-yellow-500` sur l'enfant.

Utiliser Sass permet de garder un composant **propre, encapsulé et beaucoup plus lisible**.

**Fichier concerné :** `src/sass/components/_button.scss`
