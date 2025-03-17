import type { TypedFlatConfigItem } from 'src/types'

import { GLOB_EXClUDE } from '../globs'

export async function ignores(userIgnores: string[] = []): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'huuuuug/ignores',
      ignores: [
        ...GLOB_EXClUDE,
        ...userIgnores,
      ],
    },
  ]
}
