import { WidgetRegistry } from './core/registry.js';
import { renderDashboard } from './core/dashboard.js';

import { renderStatsWidget } from './widgets/stats.js';
import { renderTableWidget } from './widgets/table.js';
import { renderChutierWidget } from './widgets/chutier.js';
import { renderNotificationsWidget } from './widgets/notifications.js';

WidgetRegistry.registerWidget('stats', renderStatsWidget);
WidgetRegistry.registerWidget('table', renderTableWidget);
WidgetRegistry.registerWidget('chutier', renderChutierWidget);
WidgetRegistry.registerWidget('notifications', renderNotificationsWidget);

const dashboardConfig = [
    {
        id: 'w1',
        type: 'stats',
        title: 'Vue d\'ensemble',
        data: [ { label: 'Users', value: 1250 }, { label: 'Revenue', value: '45K€' } ]
    },
    {
        id: 'w4',
        type: 'notifications',
        title: 'Dernières alertes',
        data: [
            { type: 'alert', message: 'Le serveur de base de données est lent.' },
            { type: 'info', message: 'Nouveau widget ajouté avec succès au projet.' }
        ]
    },
    {
        id: 'w2',
        type: 'table',
        title: 'Dernières commandes',
        data: [ { id: 1, client: "Alice", total: 250 }, { id: 2, client: "Bob", total: 120 } ]
    },
    {
        id: 'w3',
        type: 'chutier',
        title: 'Organisation Rapide',
        data: [ { id: 1, name: "Tâche A" }, { id: 2, name: "Tâche B" } ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderDashboard('app-dashboard', dashboardConfig);
});