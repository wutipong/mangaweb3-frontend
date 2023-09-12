import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		commonjsOptions: {
			transformMixedEsModules: true
		}
	},
	ssr: { noExternal: ['@popperjs/core'] },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	envPrefix: [
		'VITE_',
	]
});
