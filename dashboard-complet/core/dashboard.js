import { WidgetRegistry } from './registry.js';

export function renderDashboard(containerId, config) {
    const container = document.getElementById(containerId);
    container.className = 'tw-dashboard';
    container.innerHTML = '';

    const savedOrder = JSON.parse(localStorage.getItem('dashboard-layout'));
    let finalConfig = config;

    if (savedOrder && savedOrder.length === config.length) {
        finalConfig = savedOrder.map(id => config.find(c => c.id === id)).filter(Boolean);
    }

    finalConfig.forEach(widgetConfig => {
        const renderFn = WidgetRegistry.getWidget(widgetConfig.type);
        if (renderFn) {
            const widgetDOM = renderFn(widgetConfig.data);

            const wrapper = document.createElement('div');
            wrapper.className = 'tw-widget';
            wrapper.setAttribute('draggable', 'true');
            wrapper.setAttribute('data-id', widgetConfig.id);

            const header = document.createElement('div');
            header.className = 'tw-widget-header';
            header.textContent = widgetConfig.title || widgetConfig.type.toUpperCase();

            const content = document.createElement('div');
            content.className = 'p-4 flex-1 overflow-auto';
            content.appendChild(widgetDOM);

            wrapper.appendChild(header);
            wrapper.appendChild(content);
            container.appendChild(wrapper);
        }
    });

    enableDashboardDND(container);
}

let draggedWidget = null;

function enableDashboardDND(container) {
    container.addEventListener('dragstart', e => {
        const widget = e.target.closest('.tw-widget');
        if (widget && e.target === widget) {
            draggedWidget = widget;
            setTimeout(() => widget.classList.add('tw-widget-dragging'), 0);
        }
    });

    container.addEventListener('dragend', e => {
        if (draggedWidget) {
            draggedWidget.classList.remove('tw-widget-dragging');
            draggedWidget = null;
            saveLayout(container);
        }
        document.querySelectorAll('.tw-widget').forEach(w => w.classList.remove('tw-widget-dragover'));
    });

    container.addEventListener('dragover', e => {
        e.preventDefault();
        const targetWidget = e.target.closest('.tw-widget');
        if (targetWidget && targetWidget !== draggedWidget) {
            targetWidget.classList.add('tw-widget-dragover');
        }
    });

    container.addEventListener('dragleave', e => {
        const targetWidget = e.target.closest('.tw-widget');
        if (targetWidget) targetWidget.classList.remove('tw-widget-dragover');
    });

    container.addEventListener('drop', e => {
        e.preventDefault();
        const targetWidget = e.target.closest('.tw-widget');
        if (targetWidget && draggedWidget && targetWidget !== draggedWidget) {
            targetWidget.classList.remove('tw-widget-dragover');
            // Permute les widgets dans le DOM
            const allWidgets = [...container.querySelectorAll('.tw-widget')];
            const draggedIndex = allWidgets.indexOf(draggedWidget);
            const targetIndex = allWidgets.indexOf(targetWidget);

            if (draggedIndex < targetIndex) targetWidget.after(draggedWidget);
            else targetWidget.before(draggedWidget);
        }
    });
}

function saveLayout(container) {
    const order = [...container.querySelectorAll('.tw-widget')].map(w => w.getAttribute('data-id'));
    localStorage.setItem('dashboard-layout', JSON.stringify(order));
}