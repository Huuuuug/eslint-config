import { writeFile } from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'

import { combine, javascript, typescript, vue, stylistic } from '../src'

const configs = await combine(
  {
    plugins: { '': { rules: Object.fromEntries(builtinRules.entries()) } },
  },
  javascript(),
  typescript(),
  vue(),
  stylistic(),
)

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
  exportTypeName: 'Rules',
})

dts += `
// Names of all configs
export type ConfigNames = ${configNames.map(i => `"${i}"`).join(' | ')};
`

await writeFile('src/typegen.ts', dts)
