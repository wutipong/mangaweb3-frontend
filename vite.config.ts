import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import { config } from 'dotenv';

config()

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [sveltekit()],
		ssr: { noExternal: ['@popperjs/core'] },
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		},
		server: {
			proxy: {
				'/api': {
					target: env.BACKEND_URL,
					rewrite: (path) => path.replace(/^\/api/, ''),
					changeOrigin: true,
				}
			}
		}
	}
});
