import type { Linter } from 'eslint'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import type { Rules } from './typegen'

export function getOverrides<K extends keyof OptionsConfig>(options: OptionsConfig, key: K): Partial<Linter.RulesRecord & Rules> {
  return {
    ...(options.overrides as any)[key],
  }
}

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]): Promise<TypedFlatConfigItem[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}
