import { style } from '@vanilla-extract/css';

import { vars } from '@theme';

export const container = style({
  padding: vars.space.medium,

  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.medium,

  minWidth: 240,
});

export const header = style({
  fontSize: '3.2em',
  lineHeight: 1.1,
  margin: '0.5em 0',
});

export const boxHeader = style({
  fontSize: '1.2em',
  lineHeight: 1.1,
  margin: '0.5em 0',
  fontWeight: 'bold',
});

export const cooldownBox = style({
  padding: vars.space.medium,
  borderRadius: vars.border.radius,

  backgroundColor: vars.color.memoBg,
  display: 'flex',
  justifyContent: 'space-evenly',
  gap: vars.space.medium,
});

export const memoBox = style({
  padding: vars.space.medium,
  borderRadius: vars.border.radius,

  aspectRatio: '1 / 1',
  backgroundColor: vars.color.memoBg,
  display: 'flex',
  flexDirection: 'column',
  placeItems: 'center',
});

export const memoItem = style({
  fontWeight: 'bold',
  fontSize: vars.sizing.memo,
});
