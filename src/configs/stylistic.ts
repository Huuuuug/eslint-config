import type { TypedFlatConfigItem } from 'src/types'
import pluginStylistic from '@stylistic/eslint-plugin'

export async function stylistic(): Promise<TypedFlatConfigItem[]> {
  const config = pluginStylistic.configs.customize({
    quotes: 'single',
    indent: 2,
    semi: false,
    pluginName: '@stylistic',
  })

  return [
    {
      name: 'ganghu/stylistic/rules',
      plugins: {
        '@stylistic': pluginStylistic,
      },
      rules: {
        ...config.rules,

        '@stylistic/object-curly-newline': 'warn',
      },
    },
  ]
}
