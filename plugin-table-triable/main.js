function populateTable(tbodyId, data, keys) {
    const tbody = document.getElementById(tbodyId);
    data.forEach(item => {
        const tr = document.createElement('tr');
        // Hover sur les lignes demandé dans les contraintes
        tr.className = "hover:bg-blue-50 transition-colors border-b";

        keys.forEach(key => {
            const td = document.createElement('td');
            td.className = "p-3 text-sm text-gray-700";
            td.textContent = item[key];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

populateTable('users-tbody', users, ['name', 'age', 'city']);
populateTable('products-tbody', products, ['id', 'product', 'price']);


document.querySelectorAll('.tw-table-sortable').forEach(initSortableTable);

function initSortableTable(table) {
    const headers = table.querySelectorAll('th[data-key]');
    const tbody = table.querySelector('tbody');

    headers.forEach(th => {
        th.addEventListener('click', () => {
            const key = th.getAttribute('data-key');
            const isAsc = th.classList.contains('tw-sort-asc');
            const order = isAsc ? 'desc' : 'asc'; // On inverse le tri au clic

            updateSortUI(headers, th, order);
            sortTable(tbody, key, order, headers, th);
        });
    });
}

function updateSortUI(headers, activeTh, order) {
    headers.forEach(th => {
        th.classList.remove('tw-sort-asc', 'tw-sort-desc', 'bg-blue-100', 'text-blue-700');
    });

    activeTh.classList.add(order === 'asc' ? 'tw-sort-asc' : 'tw-sort-desc');
    activeTh.classList.add('bg-blue-100', 'text-blue-700');
}

function sortTable(tbody, key, order, headers, activeTh) {
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const thsArray = Array.from(headers);
    const colIndex = thsArray.indexOf(activeTh);

    rows.sort((a, b) => {
        const cellA = a.children[colIndex].textContent.trim();
        const cellB = b.children[colIndex].textContent.trim();

        const valA = isNaN(cellA) ? cellA : parseFloat(cellA);
        const valB = isNaN(cellB) ? cellB : parseFloat(cellB);

        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });

    rows.forEach(row => tbody.appendChild(row));
}