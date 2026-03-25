export function renderTableWidget(data) {
    const container = document.createElement('div');
    container.className = 'overflow-x-auto';

    if(data.length === 0) return container;

    const table = document.createElement('table');
    table.className = 'min-w-full text-left text-sm';

    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    trHead.className = 'border-b';

    const keys = Object.keys(data[0]);
    keys.forEach(key => {
        const th = document.createElement('th');
        th.className = 'p-2 cursor-pointer hover:bg-gray-100 select-none';
        th.textContent = key.toUpperCase();
        th.dataset.order = 'asc';

        th.addEventListener('click', () => {
            const order = th.dataset.order === 'asc' ? 'desc' : 'asc';
            th.dataset.order = order;

            trHead.querySelectorAll('th').forEach(t => t.textContent = t.textContent.replace(/[▲▼]/g, '').trim());
            th.textContent = `${key.toUpperCase()} ${order === 'asc' ? '▲' : '▼'}`;

            const rows = Array.from(tbody.querySelectorAll('tr'));
            const colIndex = keys.indexOf(key);

            rows.sort((a, b) => {
                const valA = a.children[colIndex].textContent;
                const valB = b.children[colIndex].textContent;
                const isNum = !isNaN(valA) && !isNaN(valB);
                if(isNum) return order === 'asc' ? valA - valB : valB - valA;
                return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            });
            rows.forEach(r => tbody.appendChild(r));
        });
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-gray-50';
        keys.forEach(key => {
            const td = document.createElement('td');
            td.className = 'p-2';
            td.textContent = item[key];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    container.appendChild(table);
    return container;
}