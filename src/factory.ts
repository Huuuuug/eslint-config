import { FlatConfigComposer } from 'eslint-flat-config-utils'

import { typescript, stylistic, ignores } from './configs'

import type { Linter } from 'eslint'
import type {
  Awaitable,
  ConfigNames,
  OptionsConfig,
  TypedFlatConfigItem,
} from './types'

export function huuuuug(
  options: OptionsConfig & Omit<TypedFlatConfigItem, 'files'> = {},
  ...userConfigs: Awaitable<
    | TypedFlatConfigItem
    | TypedFlatConfigItem[]
    | FlatConfigComposer<any, any>
    | Linter.Config[]
  >[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const { typescript: enableTypescript } = options

  // Base Configs
  const configs: Awaitable<TypedFlatConfigItem[]>[] = []

  configs.push(ignores(options.ignores), stylistic())

  if (enableTypescript) {
    configs.push(typescript())
  }

  const composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>()

  composer.append(...configs, ...(userConfigs as any))
  return composer
}
