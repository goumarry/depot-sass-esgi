/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./main.js"], // Important de scanner le JS !
    theme: {
        extend: {},
    },
    plugins: [
        require('./plugins/dndChutier') // On charge notre nouveau plugin
    ],
};