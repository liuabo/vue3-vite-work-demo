import { fileURLToPath, URL } from 'node:url'
import { createVitePlugins } from './build/vite'
import { loadEnv } from 'vite'
import { include, exclude } from "./build/vite/optimize.js"

// 当前执行node命令时文件夹的地址(工作目录)
const root = process.cwd()

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  let env = {}
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    base: env.VITE_BASE_PATH,
    root: root,
    // 服务端渲染
    server: {
      port: env.VITE_PORT, // 端口号
      host: "0.0.0.0",
      open: env.VITE_OPEN === 'true',
      // 本地跨域代理. 目前注释的原因：暂时没有用途，server 端已经支持跨域
      proxy: {
        ['/admin-api']: {
          target: env.VITE_BASE_URL,
          ws: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^/admin-api`), ''),
        },
      },
    },
    plugins: createVitePlugins(command, mode),
    resolve: {
      extensions: ['.js', '.json', '.scss', '.css'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      minify: 'terser',
      outDir: env.VITE_OUT_DIR || 'dist',
      sourcemap: env.VITE_SOURCEMAP === 'true' ? 'inline' : false,
      // brotliSize: false,
      terserOptions: {
        compress: {
          drop_debugger: env.VITE_DROP_DEBUGGER === 'true',
          drop_console: env.VITE_DROP_CONSOLE === 'true'
        }
      }
    },
    optimizeDeps: { include, exclude }
  }
}
