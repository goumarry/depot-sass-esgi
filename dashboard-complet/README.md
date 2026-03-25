# Dashboard Modulaire avec Tailwind CSS

Une architecture frontend modulaire basée sur le pattern Registry, permettant d'injecter et de réorganiser des widgets dynamiquement.

## 🚀 Architecture Modulaire

Le cœur de l'application (`core/dashboard.js`) est complètement agnostique : il ne connaît pas les widgets qu'il affiche.
Il lit une configuration JSON et interroge le `WidgetRegistry` pour récupérer la fonction de rendu correspondante.

## 🛠 Comment ajouter un nouveau widget ?

1. Créér un fichier dans `widgets/monNouveauWidget.js`.
2. Exporter une fonction qui prend des `data` en paramètre et retourne un élément DOM (`HTMLElement`).
3. Dans `main.js`, importer votre fonction et l'enregistrer :
   `WidgetRegistry.registerWidget('nouveauType', renderMonNouveauWidget);`
4. Ajouter un objet dans la configuration `dashboardConfig` avec `type: 'nouveauType'`.

## ✨ Fonctionnalités implémentées
- **Plugin Tailwind** : Composants structurels `.tw-dashboard`, `.tw-widget`.
- **Global Drag & Drop** : Réorganisation des widgets à la souris.
- **Bonus Persistance** : L'ordre des widgets est sauvegardé dans le `localStorage`.
- **Isolation des événements** : Le drag & drop interne du chutier n'interfère pas avec le drag & drop global des widgets grâce à `e.stopPropagation()`.

npx serve pour lancer le serve