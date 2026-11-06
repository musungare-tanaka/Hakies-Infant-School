import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { maroon: 'var(--maroon)', 'maroon-dark': 'var(--maroon-dark)', ivory: 'var(--ivory)', paper: 'var(--paper)', charcoal: 'var(--body-copy)', coral: 'var(--coral)', sky: 'var(--blue)', butter: 'var(--yellow)' }, fontFamily: { sans: ['Arial', 'sans-serif'], display: ['Trebuchet MS', 'sans-serif'] } } }, plugins: [] };
export default config;
