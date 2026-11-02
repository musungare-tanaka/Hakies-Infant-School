import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { teal: '#124F4B', ivory: '#FBF8F0', coral: '#EF8068', sky: '#BBDDE8', butter: '#F4D978' }, fontFamily: { sans: ['Arial', 'sans-serif'], display: ['Trebuchet MS', 'sans-serif'] } } }, plugins: [] };
export default config;
