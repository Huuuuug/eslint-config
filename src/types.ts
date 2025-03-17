import type { Linter } from 'eslint'
import type { Rules, ConfigNames } from './typegen'
import { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import { ParserOptions } from '@typescript-eslint/parser'

export type Awaitable<T> = T | Promise<T>

export type { Rules, ConfigNames }

export type OptionsTypescript =
  | (OptionsTypescriptWithTypes & OptionsOverrides)
  | (OptionsTypescriptParserOptions & OptionsOverrides)

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

export interface OptionsOverrides {
  overrides?: TypedFlatConfigItem['rules']
}

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

  typescript?: boolean | OptionsTypescript
}

export interface OptionsIsInEditor {
  isInEditor?: boolean
}
