export function renderChutierWidget(data) {
    const container = document.createElement('div');
    container.className = 'flex gap-4 min-h-[200px]';

    const leftZone = document.createElement('div');
    leftZone.className = 'flex-1 bg-gray-50 border-2 border-dashed border-gray-300 rounded p-2 flex flex-col gap-2 min-h-[100px]';

    setupDropZone(leftZone, 'Glissez ici pour remettre dans le chutier');

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'bg-white border p-2 rounded cursor-grab text-sm shadow-sm';
        div.textContent = item.name;
        div.draggable = true;
        div.dataset.taskId = item.id; // On stocke l'ID dans le HTML

        div.addEventListener('dragstart', (e) => {
            e.stopPropagation();
            e.dataTransfer.setData('application/x-task-id', item.id);
            setTimeout(() => div.style.opacity = '0.5', 0);
        });

        div.addEventListener('dragend', (e) => {
            e.stopPropagation();
            div.style.opacity = '1';
        });
        leftZone.appendChild(div);
    });

    const rightZone = document.createElement('div');
    rightZone.className = 'flex-1 flex flex-col gap-2';

    for(let i = 1; i <= 3; i++) {
        const slot = document.createElement('div');
        slot.className = 'flex-1 border-2 border-dashed border-gray-400 rounded bg-white p-2 flex items-center justify-center';
        setupDropZone(slot, `Zone ${i}`);
        rightZone.appendChild(slot);
    }

    function setupDropZone(zone, defaultText) {
        if (zone.children.length === 0) {
            const textSpan = document.createElement('span');
            textSpan.className = 'text-xs text-gray-400 pointer-events-none default-text';
            textSpan.textContent = defaultText;
            zone.appendChild(textSpan);
        }

        zone.addEventListener('dragover', (e) => {
            if (e.dataTransfer.types.includes('application/x-task-id')) {
                e.preventDefault();
                e.stopPropagation();
                zone.classList.add('bg-blue-50');
            }
        });

        zone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            zone.classList.remove('bg-blue-50');
        });

        zone.addEventListener('drop', (e) => {
            e.stopPropagation();
            zone.classList.remove('bg-blue-50');

            const draggedId = e.dataTransfer.getData('application/x-task-id');
            if (!draggedId) return;

            e.preventDefault();

            const draggedEl = container.querySelector(`[data-task-id="${draggedId}"]`);
            if (draggedEl) {
                const defaultTextNode = zone.querySelector('.default-text');
                if (defaultTextNode) defaultTextNode.remove();

                zone.appendChild(draggedEl);
            }
        });
    }

    container.appendChild(leftZone);
    container.appendChild(rightZone);
    return container;
}