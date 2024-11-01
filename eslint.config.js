import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'public'],
  },
  /** js推荐配置 */
  eslint.configs.recommended,
  /** ts推荐配置 */
  ...tseslint.configs.recommended,
  /** vue推荐配置 */
  ...eslintPluginVue.configs['flat/recommended'],

  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    braceStyle: '1tbs',
    arrowParens: 'always',
  }),

  /**
   * javascript 规则
   */
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    rules: {},
  },
  /**
   * 配置全局变量
   */
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        /** 追加一些其他自定义全局规则 */
      },
    },
  },

  /**
   * vue 规则
   */
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        /** typescript项目需要用到这个 */
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        /** 允许在.vue 文件中使用 JSX TSX */
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
      },
    },
    rules: {
      // 在这里追加 vue 规则
      'vue/no-mutating-props': [
        'error',
        {
          shallowOnly: true,
        },
      ],
    },
  },
  /**
   * typescript 规则
   */
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {
      // 禁止使用 var
      'no-var': 'error',
      'semi': 'off',
      // 优先使用 interface 而不是 type
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-explicit-any': 'off', // 可以使用 any 类型
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // 解决使用 require() Require statement not part of import statement. 的问题
      '@typescript-eslint/no-var-requires': 0,
      // 禁止出现未使用的变量
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
      ],
      'vue/html-indent': 'off',
      // 关闭此规则 使用 prettier 的格式化规则，
      'vue/max-attributes-per-line': ['off'],
      // 优先使用驼峰，element 组件除外
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          ignores: ['/^el-/', '/^router-/'],
          registeredComponentsOnly: false,
        },
      ],
      // 强制使用驼峰
      'camelcase': ['error', { properties: 'always' }],
      // 优先使用 const
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],
    },
  },
  /**
   * prettier 配置
   * 会合并根目录下的prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   */
  eslintPluginPrettierRecommended,
)
