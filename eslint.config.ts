import { ganghu } from './src'

export default ganghu(
  { typescript: true },
  {
    ignores: ['node_modules', 'dist', 'src/typegen.ts'],
  },
  // {
  //   files: ["src/**/*.ts"],
  //   rules: {
  //     "no-console": "warn",
  //   },
  // }
)
