import type { Linter } from 'eslint'
import type { Rules, ConfigNames } from './typegen'
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { ParserOptions } from '@typescript-eslint/parser'
import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'

export type Awaitable<T> = T | Promise<T>

export type { Rules, ConfigNames }

export type TypedFlatConfigItem = Omit<
  Linter.Config<Linter.RulesRecord & Rules>,
  'plugins'
> & {
  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An Object containing a name-value mapping of plugin names to plugin objects.
   * When `files` is specified, these plugins are only available to the matching files.
   *
   */
  plugins?: Record<string, any>
}

export interface OptionsFiles {
  /**
   * Override the `files` option to provide custom globs.
   */
  files?: string[]
}

export interface OptionsComponentExts {
  /**
   * Additional extensions for components.
   *
   * @example ['vue']
   * @default []
   */
  componentExts?: string[]
}

export interface OptionsOverrides {
  overrides?: TypedFlatConfigItem['rules']
}

export interface OptionsProjectType {
  /**
   * Type of project. `lib` will enable more strict rules for libraries.
   *
   * @default 'app'
   */
  type?: 'app' | 'lib'
}

export interface OptionsTypescriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting
   */
  tsconfigPath?: string

  /**
   * Override the `files` option to provide custom rules.
   */
  overridesTypeAware?: TypedFlatConfigItem['rules']
}

export interface OptionsTypescriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parseOptions?: Partial<ParserOptions>

  /**
   * Glob patterns for files that should be type aware.
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[]

  /**
   * Glob patterns for files that should not be type aware.
   * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
   */
  ignoresTypeAware?: string[]
}

export type OptionsTypescript =
  | (OptionsTypescriptWithTypes & OptionsOverrides)
  | (OptionsTypescriptParserOptions & OptionsOverrides)

export interface OptionsConfig
  extends OptionsComponentExts,
  OptionsProjectType {
  /**
   * Enable gitignore support.
   *
   * Passing an object to configure the gitignore options.
   *
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   * @default true
   */
  gitignore?: boolean | FlatGitignoreOptions
  /**
 * Enable TypeScript support.
 *
 * Passing an object to configure the TypeScript options.
 *
 * @default false
 */
  typescript?: boolean | OptionsTypescript

  javascript?: boolean | OptionsOverrides

  /**
   * Enable Vue support.
   *
   * default false
   */
  vue?: boolean | OptionsOverrides

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean | OptionsOverrides

  /**
   * Enable JSONC imports.
   *
   * @default true
   */
  imports?: boolean | OptionsOverrides

  /**
   * Provide custom rules to extend the base config.
   *
   * @example

  /**
   * Provide overrides for rules for each integration.
   *
   */
  overrides?: {
    typescript?: TypedFlatConfigItem['rules']
    javascript?: TypedFlatConfigItem['rules']
    vue?: TypedFlatConfigItem['rules']
    jsonc?: TypedFlatConfigItem['rules']
    imports?: TypedFlatConfigItem['rules']
  }
}

export interface OptionsIsInEditor {
  isInEditor?: boolean
}

export interface OptionsHasTypeScript {
  typeScript?: boolean
}

export interface OptionsStylistic {
  stylistic?: boolean | StylisticConfig
}

export interface StylisticConfig extends Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'jsx' | 'semi'> {}
