export default {
  entry: 'src/index.ts',
  esm: 'babel',
  disableTypeCheck: true,
  extraBabelPlugins: [
    [
      'react-directives',
      {
        prefix: 'r',
        pragmaType: 'React',
      },
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
