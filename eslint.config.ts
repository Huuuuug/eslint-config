import { ganghu } from './src'

export default ganghu(
  {
    typescript: {
      overrides: {
        'no-console': 'warn',
      },
    },
    vue: true,
    // overrides: {
    //   typescript: {
    //     'no-console': 'warn',
    //   },
    // },
  },
  {
    ignores: ['node_modules', 'dist', 'src/typegen.ts'],
  },

)
