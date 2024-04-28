import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { visualizer } from "rollup-plugin-visualizer"
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { ComComponentsResolver } from "com-components/reslovers/reslovers"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/vue': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/react': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    // VueDevTools(),
    visualizer({ filename: "./dist/stats.html" }),
    AutoImport({
      dts: false,
      imports: ['vue', 'vue-router'],
      resolvers: [
        ElementPlusResolver(),
        ComComponentsResolver()
      ],
    }),
    Components({
      dts: false,
      resolvers: [
        ElementPlusResolver(),
        ComComponentsResolver()
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: true
  }
})
