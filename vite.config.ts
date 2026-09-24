import { defineConfig } from 'vite';
export default defineConfig({ css: { postcss: { plugins: [] } }, server: { host: '127.0.0.1', port: 5180, strictPort: true, proxy: { '/.netlify/functions': 'http://127.0.0.1:5181' } }, build: { target: 'es2022' } });
