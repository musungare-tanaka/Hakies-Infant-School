import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { maroon: 'var(--maroon)', 'maroon-dark': 'var(--maroon-dark)', 'maroon-tint': 'var(--maroon-tint)', gold: 'var(--gold)', 'gold-hover': 'var(--gold-hover)', ivory: 'var(--ivory)', paper: 'var(--paper)', ink: 'var(--ink)', muted: 'var(--muted)', line: 'var(--line)', 'field-border': 'var(--field-border)' }, fontFamily: { sans: ['Arial', 'sans-serif'], display: ['Trebuchet MS', 'sans-serif'] } } }, plugins: [] };
export default config;
