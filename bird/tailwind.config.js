import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/svelte-bird/**/*.{html,js,svelte,ts}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                colorDark: '#222834',
            },
            screens: {
                '!sm': { max: '640px' },
                '!md': { max: '768px' },
                '!lg': { max: '1024px' },
                '!xl': { max: '1280px' },
                '!2xl': { max: '1536px' },
            },
        },
    },
    plugins: [
        plugin(({ addVariant, e }) => {
            addVariant('classSidebarExpanded', ({ modifySelectors, separator }) => {
                modifySelectors(
                    ({ className }) =>
                        `.classSidebarExpanded .${e(`classSidebarExpanded${separator}${className}`)}`,
                );
            });
        }),
        /////
    ],
};