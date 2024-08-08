import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const ReactCompilerConfig = {}; // Gibt noch keine Dokumentation

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
			},
		}),
	],
	/*   server: {
    open: true,
  }, */
});
