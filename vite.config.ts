import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: { noExternal: ['@popperjs/core'] },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	envPrefix: [
		'VITE_',
	],
	server: {
		proxy: {
			'/api': {
				target: process.env.PUBLIC_BACKEND_URL,
				rewrite: (path) => path.replace(/^\/api/, ''),
				changeOrigin: true,
			}
		}
	}
});
