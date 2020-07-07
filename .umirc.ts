export default {
  title: 'myDumi',
  description: 'zed 组件库',
  mode: 'doc',
  base: 'MyDumi/',
  publicPath: '/',
  extraBabelPlugins: [
    [
      'react-directives',
      {
        prefix: 'r',
        pragmaType: 'React',
      },
    ],
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
