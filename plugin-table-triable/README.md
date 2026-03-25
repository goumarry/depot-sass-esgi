# Tailwind Sortable Table Plugin

Un plugin léger et modulaire combinant Tailwind CSS et Vanilla JS pour rendre n'importe quel tableau HTML dynamiquement triable.

## Usage

1. Ajouter le plugin dans le `tailwind.config.js` :

plugins: [require('./plugins/sortableTable')]

2. Structurer le HTML en ajoutant la classe `.tw-table-sortable` sur votre balise `<table>`.

4. Ajouter l'attribut `data-key="nom_colonne"` sur chaque balise `<th>` qu'on veut rendre triable.

```
<table class="tw-table-sortable">
  <thead>
    <tr>
      <th data-key="name">Nom</th>
      <th data-key="age">Âge</th>
    </tr>
  </thead>
  <tbody>
    </tbody>
</table>
```

4. Initialiser le script JS inclus dans le projet.

## Fonctionnalités
- **Générique** : Fonctionne sur n'importe quel tableau respectant la structure.
- **Intelligent** : Détecte automatiquement s'il faut trier des nombres ou des chaînes de caractères.
- **UI Découplée** : Le style des flèches et des états actifs est géré à 100% par le plugin Tailwind.