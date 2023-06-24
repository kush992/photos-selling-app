import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		legacy({
			targets: ['defaults', 'not IE 11'],
		}),
	],
	server: {
		watch: {
			usePolling: true,
		},
		host: true, // Here
		strictPort: true,
		port: 3000,
	},
});
