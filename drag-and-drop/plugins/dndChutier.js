const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents }) {
    addComponents({
        '.tw-dnd-container': {
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-start',
        },
        '.tw-chutier': {
            flex: '1',
            minHeight: '300px',
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            border: '2px dashed #d1d5db',
        },
        '.tw-dropzones': {
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        },
        '.tw-dropzone': {
            minHeight: '100px',
            padding: '1rem',
            backgroundColor: '#ffffff',
            borderRadius: '0.5rem',
            border: '2px dashed #9ca3af',
            transition: 'all 0.2s ease',
        },
        '.tw-draggable-item': {
            padding: '0.75rem 1rem',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            marginBottom: '0.5rem',
            cursor: 'grab',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            fontWeight: '500',
        },
        '.tw-draggable-item:active': {
            cursor: 'grabbing',
        },
        '.tw-dragging': {
            opacity: '0.5',
        },
        '.tw-drag-over': {
            backgroundColor: '#eff6ff',
            borderColor: '#3b82f6',
        }
    });
});