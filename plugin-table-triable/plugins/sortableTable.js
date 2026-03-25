const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents }) {
    addComponents({
        '.tw-table-sortable th': {
            cursor: 'pointer',
            position: 'relative',
            userSelect: 'none',
            transition: 'background-color 0.2s',
        },
        '.tw-table-sortable th::after': {
            content: '""',
            marginLeft: '8px',
            display: 'inline-block',
            fontSize: '0.8em',
        },
        '.tw-table-sortable th.tw-sort-asc::after': {
            content: '"\\25B2"',
        },
        '.tw-table-sortable th.tw-sort-desc::after': {
            content: '"\\25BC"',
        }
    });
});