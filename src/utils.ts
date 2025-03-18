import type { Linter } from 'eslint'
import type { OptionsConfig } from './types'
import type { Rules } from './typegen'

export function getOverrides<K extends keyof OptionsConfig>(options: OptionsConfig, key: K): Partial<Linter.RulesRecord & Rules> {
  return {
    ...(options.overrides as any)[key],
  }
}
