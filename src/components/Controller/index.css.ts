import { style } from '@vanilla-extract/css';

import { vars } from '@theme';

export const buttonPanel = style({
  display: 'flex',
  justifyContent: 'center',
});

export const iconButton = style({
  flex: 1,
  padding: vars.space.large,

  width: vars.sizing.icon,
  height: vars.sizing.icon,

  transition: '0.25s',

  ':first-child': {
    borderTopLeftRadius: vars.border.innerRadius,
  },
  ':last-child': {
    borderTopRightRadius: vars.border.innerRadius,
  },

  ':hover': {
    backgroundColor: vars.color.primary,
    color: vars.color.white,
  },
});
