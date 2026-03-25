/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./main.js", "./core/**/*.js", "./widgets/**/*.js"],
    theme: {
        extend: {}
    },
    plugins: [ require('./plugins/dashboardPlugin') ],
};