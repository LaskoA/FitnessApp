import { createTheme } from '@mui/material';
import { createBreakpoints } from '@mui/system';

const breakpoints = createBreakpoints({});

const palette = {
  primary: {
    main: '#F5F6FA',
  },
  secondary: {
    main: '#CB4920',
  },
  error: {
    main: '#FF5252',
    dark: '#C2421F'
  },
  text: {
    primary: '#000000',
  },
  grey: {
    50: '#E5E5E5',
    100: '#ECECEC',
    200: '#ABABAB',
    300: '#E5E7EB',
    400: '#7E7E82',
    500: '#FAFBFF',
    800: '#747373',
    900: '#333434',
  },
  yellow: {
    50: '#F3BD52',
    100: '#EAB308'
  },
  green: {
    50: '#10B064',
    100: '#0AA507'
  },
  red: {
    100: '#DE0909'
  },
  common: {
    black: '#202020',
    white: '#FFFFFF',
  },
};

const typography = {
  fontFamily: 'Roboto, sans-serif',
  h1: {
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: 0,
    [breakpoints.up('md')]: {
      fontSize: 26,
    },
  },
  h2: {
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: 0,
    [breakpoints.up('md')]: {
      fontSize: 24,
    },
  },
  h3: {
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: 0,
    [breakpoints.up('md')]: {
      fontSize: 20,
    },
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: 0,
    [breakpoints.up('md')]: {
      fontSize: 18,
    },
  },
  // main
  body1: {
    [breakpoints.up('md')]: {
      fontSize: 16,
    },
  },
  // secondary
  subtitle1: {
    [breakpoints.up('md')]: {
      fontSize: 14,
    },
  },
  // small text
  subtitle2: {
    lineHeight: 1.5,
    letterSpacig: 0,
    [breakpoints.up('md')]: {
      fontSize: 12,
    },
  },
};

export const theme = createTheme({
  palette,
  typography,
  breakpoints,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
        },
        b: {
          fontWeight: 600,
        },
        strong: {
          fontWeight: 600,
          backgroundColor: palette.primary.main,
        },
        input: {
          '::-webkit-outer-spin-button,::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
          },
          '[type=number]': {
            MozAppearance: 'textfield',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'all .5s',
          textTransform: 'capitalize',
          padding: 16,
          borderRadius: 12,
          ':hover': {
            boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.5)',
          }
        },
        outlined: {
          color: palette.secondary.main,
          border: `1px solid ${palette.secondary.main}`,
          ':hover': {
            color: palette.secondary.main,
            border: `1px solid ${palette.secondary.main}`,
          },
        },
        contained: {
          color: palette.common.white,
          backgroundColor: palette.secondary.main,
          ':hover': {
            color: palette.common.white,
            backgroundColor: palette.secondary.main,
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          [breakpoints.up('md')]: {
            padding: '48px 64px',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '10px'
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: palette.grey[900],
          borderRadius: 8,
          backgroundColor: palette.common.white,
        },
        input: {
          padding: '12px 16px',
          '.MuiOutlinedInput-notchedOutline': {
            ':hover': {
              border: '1px solid grey.300',
            },
          },
          '::placeholder': {
            opacity: 1,
            color: palette.grey['200'],
          },
        },
        notchedOutline: {
          border: '1px solid transparent',
          transition: 'all .5s',
        },
      },
    },
  },
});
