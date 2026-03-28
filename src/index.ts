import * as attw from '@arethetypeswrong/core'
import * as publint from 'publint'
import * as publintUtils from 'publint/utils'
import { mergeConfig, type UserConfig } from 'tsdown/config'
import type { TsdownInputOption } from 'tsdown'

export interface LibOptions {
  entry?: 'index' | 'shallow' | 'all' | Exclude<TsdownInputOption, string>
  inlineDeps?: (string | RegExp)[]
}

export function lib(
  { entry = 'index', inlineDeps = [] }: LibOptions = {},
  overrides: UserConfig = {},
): UserConfig {
  return mergeConfig(
    {
      entry:
        entry === 'index'
          ? 'src/index.ts'
          : entry === 'shallow'
            ? 'src/*.ts'
            : entry === 'all'
              ? 'src/**/*.ts'
              : entry,
      dts: true,
      platform: 'neutral',
      deps: {
        onlyBundle: inlineDeps,
      },
      exports: true,
      publint: {
        enabled: 'ci-only',
        module: [publint, publintUtils],
      },
      attw: {
        enabled: 'ci-only',
        profile: 'esm-only',
        module: attw,
      },
    },
    overrides,
  )
}

export function nodeLib(
  options: LibOptions = {},
  overrides: UserConfig = {},
): UserConfig {
  return lib(options, {
    platform: 'node',
    ...overrides,
  })
}
