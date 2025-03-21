import pluginImport from 'eslint-plugin-import-x'
import type { OptionsStylistic, TypedFlatConfigItem } from '../types'

export async function imports(options: OptionsStylistic = {}): Promise<TypedFlatConfigItem[]> {
  const { stylistic = true } = options

  return [
    {
      name: 'ganghu/imports/rules',
      plugins: {
        import: pluginImport,
      },
      rules: {
        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {},
      },
    },
  ]
}
