import { type UserConfig, defineConfig, loadEnv } from 'vite'
import viteQiankun from 'vite-plugin-qiankun'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer"

const env = loadEnv('development', __dirname)

const server: UserConfig['server'] = env.VITE_PORT
  ? {
      port: +env.VITE_PORT,
      strictPort: true,
      cors: true
    }
  : {}

export default defineConfig(({ command }) => {
  return {
    base: '/react',
    server,
    plugins: [
      // 在开发模式下需要把react()关掉
      // https://github.com/umijs/qiankun/issues/1257
      ...(command === 'serve' ? [] : [react()]),
      visualizer({ filename: "./dist/stats.html" }),
      viteQiankun('react-project', { useDevMode: true })
    ]
  }
})
