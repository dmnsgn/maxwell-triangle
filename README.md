# maxwell-triangle

[![npm version](https://img.shields.io/npm/v/maxwell-triangle)](https://www.npmjs.com/package/maxwell-triangle)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/maxwell-triangle)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/maxwell-triangle)](https://bundlephobia.com/package/maxwell-triangle)
[![dependencies](https://img.shields.io/librariesio/release/npm/maxwell-triangle)](https://github.com/dmnsgn/maxwell-triangle/blob/main/package.json)
[![types](https://img.shields.io/npm/types/maxwell-triangle)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/maxwell-triangle)](https://github.com/dmnsgn/maxwell-triangle/blob/main/LICENSE.md)

Get color values inside a Maxwell triangle from positions and vice versa.

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

![](https://raw.githubusercontent.com/dmnsgn/maxwell-triangle/main/screenshot.png)

## Installation

```bash
npm install maxwell-triangle
```

## Usage

```js
import MaxwellTriangle from "maxwell-triangle";

const maxwellTriangle = new MaxwellTriangle(512);

// Get the value at the bottom center of the triangle
const value = maxwellTriangle.getValue(256, 512);
```

## API

<!-- api-start -->

<a name="MaxwellTriangle"></a>

## MaxwellTriangle

Create a Maxwell Triangle

**Kind**: global class

- [MaxwellTriangle](#MaxwellTriangle)
  - [.getValue(x, y)](#MaxwellTriangle+getValue) ⇒ <code>Array.&lt;number&gt;</code>
  - [.getPoint(r, g, b)](#MaxwellTriangle+getPoint) ⇒ <code>Array.&lt;number&gt;</code>

<a name="MaxwellTriangle+getValue"></a>

### maxwellTriangle.getValue(x, y) ⇒ <code>Array.&lt;number&gt;</code>

Get a [r, g, b] value at x/y position in the given size

**Kind**: instance method of [<code>MaxwellTriangle</code>](#MaxwellTriangle)

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |

<a name="MaxwellTriangle+getPoint"></a>

### maxwellTriangle.getPoint(r, g, b) ⇒ <code>Array.&lt;number&gt;</code>

Get a x/y position from r, g, b values

**Kind**: instance method of [<code>MaxwellTriangle</code>](#MaxwellTriangle)

| Param | Type                |
| ----- | ------------------- |
| r     | <code>number</code> |
| g     | <code>number</code> |
| b     | <code>number</code> |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/maxwell-triangle/blob/main/LICENSE.md).
