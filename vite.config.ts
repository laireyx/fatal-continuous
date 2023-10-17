import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), vanillaExtractPlugin()],

  base: './',

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          cv: ['@techstark/opencv-js'],
        },
      },
    },
  },

  resolve: {
    alias: {
      fs: 'empty-module',
      path: 'empty-module',
      crypto: 'empty-module',
    },
  },
});
