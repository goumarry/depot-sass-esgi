export function renderNotificationsWidget(data) {
    const container = document.createElement('div');
    container.className = 'flex flex-col gap-3';

    if (!data || data.length === 0) {
        container.innerHTML = '<p class="text-sm text-gray-500 italic">Aucune nouvelle notification.</p>';
        return container;
    }

    data.forEach(notif => {
        const alertBox = document.createElement('div');
        const bgColor = notif.type === 'alert' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-blue-50 border-blue-200 text-blue-700';

        alertBox.className = `p-3 rounded-md border text-sm flex items-start gap-2 shadow-sm ${bgColor}`;
        alertBox.innerHTML = `
      <span class="font-bold">${notif.type === 'alert' ? '🚨' : 'ℹ️'}</span>
      <span>${notif.message}</span>
    `;

        container.appendChild(alertBox);
    });

    return container;
}