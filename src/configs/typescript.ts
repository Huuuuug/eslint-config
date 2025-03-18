import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsEslintParser from '@typescript-eslint/parser'
import { GLOB_TS, GLOB_TSX } from '../globs'
import type {
  OptionsComponentExts,
  OptionsFiles,
  OptionsOverrides,
  TypedFlatConfigItem,
} from 'src/types'

export async function typescript(
  options: OptionsFiles & OptionsComponentExts & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const { componentExts = [], overrides } = options

  const files = options.files ?? [
    GLOB_TS,
    GLOB_TSX,
    ...componentExts.map(ext => `**/*.${ext}`),
  ]

  return [
    {
      name: 'ganghu/typescript/setup',
      languageOptions: {
        parser: tsEslintParser,
        parserOptions: {
          sourceType: 'module',
        },
      },
      plugins: {
        '@typescript-eslint': tsEslintPlugin,
      },
    },
    {
      files,
      name: 'ganghu/typescript/rules',
      rules: {
        ...tsEslintPlugin.configs['eslint-recommended'].rules,
        ...tsEslintPlugin.configs['strict'].rules,
        'dot-notation': 'off',
        'no-console': ['error', { allow: ['warn', 'error'] }],

        'no-dupe-class-members': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',

        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/consistent-type-imports': [
          'error', {
            disallowTypeAnnotations: false,
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],
        '@typescript-eslint/method-signature-style': ['error', 'property'], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-redeclare': ['error', { builtinGlobals: false }],
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        }],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        '@typescript-eslint/no-useless-constructor': 'off',
        '@typescript-eslint/no-wrapper-object-types': 'error',
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/unified-signatures': 'off',

        ...overrides,
      },
    },
  ]
}
