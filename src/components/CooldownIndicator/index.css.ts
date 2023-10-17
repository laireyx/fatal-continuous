import { style } from '@vanilla-extract/css';

export const indicator = style({
  margin: 'auto',

  display: 'flex',
  alignItems: 'center',
});

export const cooldownText = style({
  marginLeft: '1em',

  fontSize: '1.4em',
  fontFamily: 'monospace',
  fontWeight: 'bold',

  minWidth: '2ch',
});
