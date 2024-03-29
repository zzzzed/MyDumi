// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    // https://cn.eslint.org/docs/rules/
    'eslint:recommended',
    // https://github.com/yannickcr/eslint-plugin-react
    'plugin:react/recommended',
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // https://github.com/facebook/react/issues/14920
    'plugin:react-hooks/recommended',
    // r-if
    'plugin:react-directives/recommended',
    // 格式化
    // https://github.com/prettier/eslint-config-prettier/blob/master/README.md
    // 'plugin:prettier/recommended'
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'react-directives'],
  rules: {
    // react-hooks校验
    'react-hooks/rules-of-hooks': 'warn', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react-directives/no-undef': 'warn',
    'react-directives/no-unused-vars': 'warn',
    // 禁止出现console
    'no-console': 'warn',
    // 禁用debugger
    'no-debugger': 'warn',
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 'warn',
    // 禁止出现空语句块
    'no-empty': 'warn',
    // 禁止不必要的括号
    'no-extra-parens': 'warn',
    // 禁止对 function 声明重新赋值
    'no-func-assign': 'warn',
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 'warn',
    // 强制所有控制语句使用一致的括号风格
    curly: 'warn',
    // 要求 switch 语句中有 default 分支
    'default-case': 'warn',
    // 强制尽可能地使用点号
    'dot-notation': 'warn',
    // 要求使用 === 和 !==
    eqeqeq: 'warn',
    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': 'warn',
    // 禁止出现空函数
    'no-empty-function': 'warn',
    // 禁用不必要的嵌套块
    'no-lone-blocks': 'warn',
    // 禁止使用多个空格
    'no-multi-spaces': 'warn',
    // 禁止多次声明同一变量
    'no-redeclare': 'warn',
    // 禁止在 return 语句中使用赋值语句
    'no-return-assign': 'warn',
    // 禁用不必要的 return await
    'no-return-await': 'warn',
    // 禁止自我赋值
    'no-self-assign': 'warn',
    // 禁止自身比较
    'no-self-compare': 'warn',
    // 禁止不必要的 catch 子句
    'no-useless-catch': 'warn',
    // 禁止多余的 return 语句
    'no-useless-return': 'warn',
    // 禁止变量声明与外层作用域的变量同名
    'no-shadow': 'warn',
    // 禁止出现未使用过的变量
    'no-unused-vars': 'warn',
    // 允许delete变量
    'no-delete-var': 'off',
    // 强制数组方括号中使用一致的空格
    'array-bracket-spacing': 'warn',
    // 强制在代码块中使用一致的大括号风格
    'brace-style': 'warn',
    // 强制使用骆驼拼写法命名约定
    camelcase: 'warn',
    // 要求或禁止末尾逗号
    'comma-dangle': 'warn',
    // 强制使用一致的缩进
    indent: 'off',
    // 强制在 JSX 属性中一致地使用双引号或单引号
    'jsx-quotes': 'warn',
    // 强制可嵌套的块的最大深度4
    'max-depth': 'warn',
    // 强制最大行数 300
    'max-lines': ['warn', { max: 500 }],
    // 强制函数最大代码行数 50
    'max-lines-per-function': ['warn', { max: 70 }],
    // 强制函数块最多允许的的语句数量20
    'max-statements': ['warn', 100],
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': ['warn', 3],
    // 强制函数定义中最多允许的参数数量
    'max-params': ['warn', 3],
    // 强制每一行中所允许的最大语句数量
    'max-statements-per-line': ['warn', { max: 1 }],
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 3 }],
    // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-lonely-if': 'warn',
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 'warn',
    // 禁止出现多行空行
    'no-multiple-empty-lines': 'warn',
    // 禁止出现;
    semi: ['warn', 'never'],
    // 强制在块之前使用一致的空格
    'space-before-blocks': 'warn',
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': ['warn', 'never'],
    // 强制在圆括号内使用一致的空格
    'space-in-parens': 'warn',
    // 要求操作符周围有空格
    'space-infix-ops': 'warn',
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': 'warn',
    // 强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': 'warn',
    // 强制在 switch 的冒号左右有空格
    'switch-colon-spacing': 'warn',
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': 'warn',
    'no-var': 'warn',
    'prefer-const': 'warn',
    'dot-notation': 'warn',
    'no-unused-vars': 'warn',
    'prefer-rest-params': 'warn',
    'no-undef': 'warn',
    // react
    //
    'react/no-access-state-in-setstate': 'warn',
    // 用数组index作为key
    'react/no-array-index-key': 'warn',
    'react/no-deprecated': 'warn',
    'react/no-did-mount-set-state': 'warn',
    'react/no-unused-state': 'warn',
    'react/react-in-jsx-scope': 'warn',
    'react/jsx-key': 'warn',
    'react/prop-types': 'warn',
    'react/display-name': 'warn',
    // jsx内嵌深度
    'react/jsx-max-depth': ['warn', { max: 10 }],
    'react/jsx-uses-vars': 'warn',
    // typescript
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/await-thenable': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    // 禁止使用any
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-as-const': 'warn',
    '@typescript-eslint/no-unused-vars-experimental': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/camelcase': 'warn',
    '@typescript-eslint/type-annotation-spacing': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/class-name-casing': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/ban-ts-ignore': 'warn',
    '@typescript-eslint/no-this-alias': 'warn',
    // https://github.com/yannickcr/eslint-plugin-react
    // http://eslint.cn/docs/rules/
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
  },
};
