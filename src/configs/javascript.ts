import type { OptionsIsInEditor, OptionsOverrides, TypedFlatConfigItem } from 'src/types'

import globals from 'globals'

export async function javascript(options: OptionsIsInEditor & OptionsOverrides = {}): Promise<TypedFlatConfigItem[]> {
  const {} = options
  return [{
    name: 'ganghu/javascript/setup',
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
  }]
}
