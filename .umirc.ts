export default {
  title: 'myDumi',
  description: 'zed 组件库',
  hash: true,
  history: { type: 'hash' },
  mode: 'doc',
  // base: 'MyDumi/',
  // publicPath: '/MyDumi/',
  base: '/',
  publicPath: './',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
};
