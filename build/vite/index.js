import { resolve } from 'path'
import Vue from '@vitejs/plugin-vue'
import progress from 'vite-plugin-progress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import viteCompression from 'vite-plugin-compression'
import PurgeIcons from 'vite-plugin-purge-icons'
// import EslintPlugin from 'vite-plugin-eslint'
import UnoCSS from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'

export function createVitePlugins(command, mode) {
  const root = process.cwd()

  // 路径查找
  function pathResolve(dir) {
    return resolve(root, '.', dir)
  }

  return [
    Vue(),
    UnoCSS(),
    progress(),
    PurgeIcons(),
    ElementPlus({}),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: [
        'vue',
        'vue-router',
        // 可额外添加需要 autoImport 的组件
        {
          '@/hooks/web/useEmitt': ['useEmitt'],
          // '@/hooks/web/useI18n': ['useI18n'],
          '@/hooks/web/useMessage': ['useMessage'],
          // '@/hooks/web/useTable': ['useTable'],
          // '@/hooks/web/useCrudSchemas': ['useCrudSchemas'],
          // '@/utils/formRules': ['required'],
          '@/utils/dict': ['DICT_TYPE']
        }
      ],
      dts: false,
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Components({
     // 自定义组件的解析器
      resolvers: [ElementPlusResolver()],
      dts: false,
      globs: ['src/components/**/**.{vue, md}'] // , '!src/components/xxx/**'
    }),
    // EslintPlugin({
    //   cache: true,
    //   include: ['src/**/*.vue', 'src/**/*.js'] // 检查的文件
    // }),
    createSvgIconsPlugin({
      iconDirs: [pathResolve('src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: true
    }),
    viteCompression({
      verbose: true, // 是否在控制台输出压缩结果
      disable: false, // 是否禁用
      threshold: 10240, // 体积大于 threshold 才会被压缩,单位 b
      algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz', // 生成的压缩包后缀
      deleteOriginFile: false //压缩后是否删除源文件
    }),
    viteMockServe({
      mockPath: 'src/api/mock',
      // 开发打包开关
      localEnabled: command === "serve" && mode === "mock", //在开发环境中启用 mock
      // 生产打包开关
      prodEnabled: true,
      // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
      supportTs: true,
      // 监视文件更改
      watchFiles: true,
      logger: true
    }),
  ]
}
