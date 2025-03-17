import { huuuuug } from './src'

export default huuuuug(
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
