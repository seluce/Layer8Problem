import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        svelte(),
        tailwindcss()
    ],

    // Relative paths in the build output. This is what makes one build work in
    // both shells: GitHub Pages serves the game from /Layer8Problem/, while
    // Electron loads it from file://. An absolute base would break one or the
    // other.
    base: './',

    build: {
        outDir: 'dist',
        emptyOutDir: true,

        // Bundled output goes to dist/build/, not the default dist/assets/.
        // public/assets/ is copied verbatim into dist/assets/, so the default
        // would mix generated bundles and static files in one directory —
        // and a public file could in principle shadow a generated one.
        assetsDir: 'build',

        // The game data is roughly 1.2 MB of prose split across eight pools that
        // load on demand. Vite warns about chunk size by default; that warning
        // is noise here because the split is deliberate.
        chunkSizeWarningLimit: 800
    },

    server: {
        port: 8080,
        open: false
    }
});
