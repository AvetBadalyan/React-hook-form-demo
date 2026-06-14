// This file teaches styled-components what our theme looks like.
// Without it, `theme` inside every styled-component would have type `{}`
// and you'd get no autocomplete or type errors.
//
// We MUST use interface merging inside `declare module` — there is no other
// way to augment a third-party module in TypeScript. The ESLint rule
// `no-empty-object-type` normally forbids empty interfaces, but here it is
// the correct and only pattern, so we disable it for this one line.

import type { Theme } from './theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
