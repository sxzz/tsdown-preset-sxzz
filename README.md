# tsdown-preset-sxzz

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Unit Test][unit-test-src]][unit-test-href]

An opinionated preset for [tsdown](https://tsdown.dev/).

## Install

```bash
npm i tsdown-preset-sxzz
```

## Usage

```ts
// tsdown.config.ts
import { defineConfig } from 'tsdown'
import { lib, nodeLib } from 'tsdown-preset-sxzz'

export default lib()
// export default nodeLib()
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2025-PRESENT [Kevin Deng](https://github.com/sxzz)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/tsdown-preset-sxzz.svg
[npm-version-href]: https://npmjs.com/package/tsdown-preset-sxzz
[npm-downloads-src]: https://img.shields.io/npm/dm/tsdown-preset-sxzz
[npm-downloads-href]: https://www.npmcharts.com/compare/tsdown-preset-sxzz?interval=30
[unit-test-src]: https://github.com/sxzz/tsdown-preset-sxzz/actions/workflows/unit-test.yml/badge.svg
[unit-test-href]: https://github.com/sxzz/tsdown-preset-sxzz/actions/workflows/unit-test.yml
