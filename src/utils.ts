import type { Linter } from 'eslint'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import type { Rules } from './typegen'

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>
export function resolveSubOptions<K extends keyof OptionsConfig>(options: OptionsConfig, key: K): ResolvedOptions<OptionsConfig[K]> {
  return typeof options[key] === 'boolean' ? {} as any : options[key] || {} as any
}

export function getOverrides<K extends keyof OptionsConfig>(options: OptionsConfig, key: K): Partial<Linter.RulesRecord & Rules> {
  const sub = resolveSubOptions(options, key)
  return {
    ...(options.overrides as any)?.[key],
    ...'overrides' in sub ? sub.overrides : {},
  }
}

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]): Promise<TypedFlatConfigItem[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}
