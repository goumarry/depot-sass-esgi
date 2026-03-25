# Plugin Tailwind : Drag & Drop Chutier

Un plugin Tailwind couplé à Vanilla JS pour créer une interface de glisser-déposer native HTML5 robuste, réutilisable et sans dépendance externe.

## 🚀 Utilisation

1. Ajouter le plugin dans `tailwind.config.js` :
   plugins: [ require('./plugins/dndChutier') ]

2. Structurer le HTML en utilisant les classes du plugin :
```
<div class="tw-dnd-container">
  <div class="tw-chutier" id="chutier"></div>
  <div class="tw-dropzones">
    <div class="tw-dropzone" data-zone="1"></div>
    <div class="tw-dropzone" data-zone="2"></div>
  </div>
</div>
```

3. Initialiser le script JS :
   initDndChutier({
   chutierSelector: '#chutier',
   dropzoneSelector: '.tw-dropzone',
   data: productsArray
   });

## Fonctionnalités
- **Drag & Drop Natif** : API HTML5 (`dragstart`, `dragover`, `drop`).
- **Mouvement libre** : Glisser du chutier vers les zones, entre les zones, ou retour au chutier.
- **Sauvegarde d'état (Bonus)** : La position des éléments est sauvegardée dans le `localStorage` et restaurée au rechargement de la page.
- **UI Découplée** : Tous les états visuels (`tw-dragging`, `tw-drag-over`) sont gérés par le plugin Tailwind.