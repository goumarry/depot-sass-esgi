export function renderStatsWidget(data) {
    const container = document.createElement('div');
    container.className = 'grid grid-cols-2 gap-4';

    data.forEach(stat => {
        const card = document.createElement('div');
        card.className = 'bg-blue-50 p-4 rounded-lg text-center';
        card.innerHTML = `
      <div class="text-sm text-gray-500 font-medium">${stat.label}</div>
      <div class="text-2xl font-bold text-blue-600">${stat.value}</div>
    `;
        container.appendChild(card);
    });

    return container;
}