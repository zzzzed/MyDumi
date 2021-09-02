const path = require('path');
import { defineConfig } from 'dumi';
export default defineConfig({
  title: 'myDumi',
  description: 'zed 组件库',
  hash: true,
  history: { type: 'hash' },
  mode: 'doc',
  base: '/',
  publicPath: './',
  // mfsu: {},
  ignoreMomentLocale: true, // 忽略moment的local文件
  // dynamicImport: {
  //   loading: '@/loading',
  // },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    memo.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
});
