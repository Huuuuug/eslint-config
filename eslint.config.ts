import { ganghu } from './src'

export default ganghu(
  { typescript: true, overrides: {
    typescript: {
      'no-console': 'warn',
    },
  } },
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
