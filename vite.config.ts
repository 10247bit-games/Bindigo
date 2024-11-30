import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      isProd && visualizer({
        filename: './bundle-analysis.html',
        open: true
      })
    ].filter(Boolean),

    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@utils': resolve(__dirname, './src/utils'),
        '@lib': resolve(__dirname, './src/lib')
      }
    },

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'framer-motion',
        'lucide-react',
        'canvas-confetti',
        'howler',
        'use-sound'
      ]
    },

    server: {
      port: parseInt(env.VITE_PORT || '5173'),
      strictPort: true,
      host: true,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp'
      }
    },

    build: {
      sourcemap: !isProd,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['framer-motion', 'lucide-react'],
            utils: ['canvas-confetti', 'howler', 'use-sound'],
            query: ['@tanstack/react-query', '@tanstack/react-query-devtools']
          }
        }
      },
      minify: isProd ? 'terser' : false,
      terserOptions: isProd ? {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      } : undefined
    },

    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    }
  };
});