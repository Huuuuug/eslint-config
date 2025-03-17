import { writeFile } from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { presetAll } from '../src/presets'

const configs = [
  ...(await presetAll()),
  {
    plugins: { '': { rules: Object.fromEntries(builtinRules) } },
  },
]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
  exportTypeName: 'Rules',
})

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

dts += `
// Names of all configs
export type ConfigNames = ${configNames.map(i => `"${i}"`).join(' | ')};
`

await writeFile('src/typegen.ts', dts)
