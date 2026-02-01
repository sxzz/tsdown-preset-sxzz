import process from 'node:process'
import { mergeConfig, type UserConfig } from 'tsdown/config'
import type {
  AttwOptions,
  PublintOptions,
  TsdownInputOption,
  WithEnabled,
} from 'tsdown'

const resolveOpts = { paths: [process.cwd()] }
function isInstalled(pkg: string): boolean {
  try {
    require.resolve(pkg, resolveOpts)
    return true
  } catch {
    return false
  }
}

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
        tsgo: isInstalled('@typescript/native-preview'),
      },
      platform: 'neutral',
      inlineOnly: inlineDeps,
      exports: true,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      publint: {
        enabled: 'ci-only',
        resolvePaths: [import.meta.dirname],
      } as WithEnabled<PublintOptions>,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      attw: {
        enabled: 'ci-only',
        resolvePaths: [import.meta.dirname],
        profile: 'esm-only',
      } as WithEnabled<AttwOptions>,
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
