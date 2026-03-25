let draggedItem = null;

function initDndChutier(config) {
    const { chutierSelector, dropzoneSelector, data } = config;

    const chutier = document.querySelector(chutierSelector);
    const dropzones = document.querySelectorAll(dropzoneSelector);

    renderChutier(chutier, dropzones, data);
    enableDragAndDrop(chutier, dropzones);
}

function renderChutier(chutier, dropzones, data) {
    const savedState = JSON.parse(localStorage.getItem('dnd-state')) || {};

    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('tw-draggable-item');
        div.textContent = item.name;
        div.setAttribute('draggable', 'true');
        div.setAttribute('data-id', item.id);

        if (savedState[item.id]) {
            const targetZone = document.querySelector(`[data-zone="${savedState[item.id]}"]`);
            if (targetZone) targetZone.appendChild(div);
            else chutier.appendChild(div);
        } else {
            chutier.appendChild(div);
        }
    });
}

function enableDragAndDrop(chutier, dropzones) {
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('tw-draggable-item')) {
            draggedItem = e.target;
            setTimeout(() => e.target.classList.add('tw-dragging'), 0);
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('tw-draggable-item')) {
            e.target.classList.remove('tw-dragging');
            draggedItem = null;
            saveState(dropzones);
        }
    });

    const allZones = [chutier, ...Array.from(dropzones)];

    allZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('tw-drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('tw-drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('tw-drag-over');

            if (draggedItem) {
                zone.appendChild(draggedItem);
            }
        });
    });
}

function saveState(dropzones) {
    const state = {};
    dropzones.forEach(zone => {
        const zoneId = zone.getAttribute('data-zone');
        const items = zone.querySelectorAll('.tw-draggable-item');
        items.forEach(item => {
            state[item.getAttribute('data-id')] = zoneId;
        });
    });
    localStorage.setItem('dnd-state', JSON.stringify(state));
}

document.addEventListener('DOMContentLoaded', () => {
    initDndChutier({
        chutierSelector: '#chutier',
        dropzoneSelector: '.tw-dropzone',
        data: products
    });
});