import { style } from '@vanilla-extract/css';

import { vars } from '@theme';

export const memoDialog = style({
  borderRadius: vars.border.radius,
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.medium,
});

export const iconWrapper = style({
  alignSelf: 'flex-end',
});

export const icon = style({
  width: vars.sizing.icon,
  height: vars.sizing.icon,
});

export const memoEditor = style({
  display: 'flex',
  gap: vars.space.medium,
});

export const dialWrapper = style({
  height: vars.sizing.dial.wrapperHeight,

  // blur effect on top and bottom of the scroll dial
  position: 'relative',
  ':after': {
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    content: ' ',
    background: `linear-gradient(${vars.color.white} 0%, transparent 30%, transparent 70%, ${vars.color.white} 100%)`,
  },
});
export const floorDial = style({
  display: 'flex',
  flexDirection: 'column',

  height: '100%',

  overflow: 'scroll',

  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const floorItem = style({
  userSelect: 'none',

  borderRadius: vars.border.radius,

  width: vars.sizing.dial.itemWidth,
  height: vars.sizing.dial.itemHeight,
  flex: '1 0 auto',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  transition: '2s',
  ':hover': {
    backgroundColor: vars.color.primary,
    color: vars.color.white,

    transition: 'ease-out 0.5s',
  },

  ':first-child': {
    marginTop: `calc(${vars.sizing.dial.itemHeight} * 4)`,
  },

  ':last-child': {
    marginBottom: `calc(${vars.sizing.dial.itemHeight} * 4)`,
  },
});

export const floorItemSelected = style({
  backgroundColor: vars.color.primary,
  color: vars.color.white,
});

export const memoArea = style({
  border: 'none',
  borderRadius: vars.border.radius,

  boxSizing: 'border-box',
  height: vars.sizing.dial.wrapperHeight,
  aspectRatio: '1 / 1',

  backgroundColor: vars.color.memoBg,
  padding: vars.space.large,

  fontWeight: 'bold',
  fontSize: vars.sizing.memo,
});
