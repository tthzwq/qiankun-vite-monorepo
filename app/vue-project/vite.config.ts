import { fileURLToPath, URL } from 'node:url'

import { type UserConfig, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import viteQiankun from 'vite-plugin-qiankun'
import { visualizer } from "rollup-plugin-visualizer"

const env = loadEnv('development', __dirname)

const server: UserConfig['server'] = env.VITE_PORT
  ? {
      port: +env.VITE_PORT,
      strictPort: true,
      cors: true
    }
  : {}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vue",
  server,
  plugins: [
    vue(),
    vueJsx(),
    // VueDevTools(),
    visualizer({ filename: "./dist/stats.html" }),
    viteQiankun('vue-project', { useDevMode: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
