import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig(function (env) {

  const isDev = env.command !== 'build'

  return {
    define: {
      isDev
    },
    resolve: {
      alias: {
        'src': path.join(__dirname, './src')
      }
    }
  }
})