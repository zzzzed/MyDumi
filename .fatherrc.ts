export default {
  entry: 'src/index.ts',
  esm: {
    type: 'babel',
    minify: true,
  },
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
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
