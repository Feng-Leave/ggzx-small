import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintPrettier from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 核心插件配置
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintPrettier,

  // 环境全局变量
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  },

  // 基础文件匹配（后置确保覆盖）
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },

  // 忽略文件配置
  {
    ignores: ['dist', '**/node_modules'],
  },

  // Vue 文件特殊配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        // 如果使用 JSX 则保留以下配置
        // jsxPragma: "h",
        // ecmaFeatures: { jsx: true },
      },
    },
  },

  // 自定义规则
  {
    rules: {
      'no-var': 'error',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-unexpected-multiline': 'error',
      'no-useless-escape': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/semi': 'off',

      'vue/multi-word-component-names': 'warn',
      'vue/no-mutating-props': 'warn',
      'vue/attribute-hyphenation': 'off',
    },
  },
]
