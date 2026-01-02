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
      dts: {
        resolve: inlineDeps,
      },
      platform: 'neutral',
      inlineOnly: inlineDeps,
      exports: true,
      publint: {
        enabled: 'ci-only',
        // @ts-expect-error internal
        resolvePaths: [import.meta.dirname],
      },
      attw: {
        enabled: 'ci-only',
        // @ts-expect-error internal
        resolvePaths: [import.meta.dirname],
        profile: 'esm-only',
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
