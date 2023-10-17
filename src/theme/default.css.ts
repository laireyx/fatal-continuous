import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    text: '#213547',
    primary: '#213547',
    white: 'white',

    memoBg: '#f0f0f0',
    buttonBg: '#d9d9d9',
    iconBg: '#f0f0f0',
  },

  space: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },

  sizing: {
    memo: '14pt',
    icon: '24px',
    dial: {
      itemWidth: '96px',
      itemHeight: '48px',
      wrapperHeight: `calc(48px * 9)`,
    },
  },

  border: {
    normal: '2px solid currentColor',
    thick: '4px solid currentColor',

    radius: '8px',
    innerRadius: '4px',
  },
});
