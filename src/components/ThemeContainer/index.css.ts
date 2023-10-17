import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@theme';

export const menu = style({
  maxWidth: 1280,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
});

globalStyle(`${menu} > *`, {
  border: vars.border.normal,
});

globalStyle(`${menu} > *:first-child`, {
  borderTopLeftRadius: vars.border.radius,
  borderTopRightRadius: vars.border.radius,
});

globalStyle(`${menu} > *:nth-child(n+3)`, {
  borderTop: 'none',
});

globalStyle(`${menu} > *:last-child`, {
  borderBottomLeftRadius: vars.border.radius,
  borderBottomRightRadius: vars.border.radius,
});
