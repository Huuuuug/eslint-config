import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsEslintParser from '@typescript-eslint/parser'
import { GLOB_TS, GLOB_TSX } from '../globs'
import {
  OptionsComponentExts,
  OptionsFiles,
  OptionsOverrides,
  TypedFlatConfigItem,
} from 'src/types'

export async function typescript(
  options: OptionsFiles & OptionsComponentExts & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const { componentExts = [] } = options

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
        ...tsEslintPlugin.configs['recommended'].rules,
        ...tsEslintPlugin.configs['strict'].rules,
        '@typescript-eslint/no-explicit-any': 'off',
        'dot-notation': 'off',
        'no-console': ['error', { allow: ['warn', 'error'] }],
      },
    },
  ]
}
