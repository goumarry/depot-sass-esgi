const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents }) {
    addComponents({
        '.tw-dashboard': {
            display: 'grid',
            gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
            gap: '1.5rem',
            padding: '1.5rem',
            '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
            '@media (min-width: 1024px)': { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
        },
        '.tw-widget': {
            backgroundColor: '#ffffff',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            cursor: 'grab',
            transition: 'transform 0.2s',
        },
        '.tw-widget:active': {
            cursor: 'grabbing',
        },
        '.tw-widget-header': {
            padding: '1rem 1.5rem',
            backgroundColor: '#f9fafb',
            borderBottom: '1px solid #e5e7eb',
            fontWeight: '600',
            color: '#374151',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        '.tw-widget-dragging': { opacity: '0.4', transform: 'scale(0.98)' },
        '.tw-widget-dragover': { border: '2px dashed #3b82f6' }
    });
});