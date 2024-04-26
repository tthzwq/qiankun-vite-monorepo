import { type UserConfig, defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const env = loadEnv('development', __dirname)

const server: UserConfig['server'] = env.VITE_PORT
  ? {
      port: +env.VITE_PORT,
      strictPort: true,
      cors: true
    }
  : {}

export default defineConfig({
  base: '/react',
  server,
  plugins: [react()]
})
