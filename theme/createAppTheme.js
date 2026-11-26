import { alpha, createTheme } from '@mui/material/styles';

const lightPalette = {
  background: { default: '#f3f0e8', paper: '#e9e4d9' },
  text: { primary: '#171915', secondary: '#62665d' },
  primary: { main: '#0b6547', contrastText: '#f3f0e8' },
  secondary: { main: '#4e675a', contrastText: '#f8f5ed' },
  success: { main: '#2f6a4b', contrastText: '#f8f5ed' },
  info: { main: '#2e6870', contrastText: '#f8f5ed' },
  warning: { main: '#7b5a20', contrastText: '#f8f5ed' },
  error: { main: '#93483e', contrastText: '#f8f5ed' },
  action: {
    active: '#62665d',
    hover: 'rgba(11, 101, 71, .08)',
    hoverOpacity: .08,
    selected: 'rgba(11, 101, 71, .14)',
    selectedOpacity: .14,
    disabled: 'rgba(98, 102, 93, .58)',
    disabledBackground: 'rgba(98, 102, 93, .12)',
    disabledOpacity: .58,
    focus: 'rgba(11, 101, 71, .16)',
    focusOpacity: .16,
    activatedOpacity: .18
  },
  control: {
    surface: '#f8f5ed',
    surfaceHover: '#fdfaf2',
    surfaceDisabled: '#e4dfd4',
    border: 'rgba(23, 25, 21, .38)',
    borderHover: 'rgba(23, 25, 21, .68)',
    borderDisabled: 'rgba(23, 25, 21, .18)',
    placeholder: '#62665d',
    disabledText: 'rgba(98, 102, 93, .58)'
  },
  divider: 'rgba(23, 25, 21, .22)'
};

const darkPalette = {
  background: { default: '#171a17', paper: '#20241f' },
  text: { primary: '#f1eee5', secondary: '#b8baaf' },
  primary: { main: '#72d1a2', contrastText: '#142018' },
  secondary: { main: '#9fb4a7', contrastText: '#142018' },
  success: { main: '#78c999', contrastText: '#142018' },
  info: { main: '#79bac0', contrastText: '#142018' },
  warning: { main: '#d7aa63', contrastText: '#142018' },
  error: { main: '#e08a7d', contrastText: '#142018' },
  action: {
    active: '#b8baaf',
    hover: 'rgba(114, 209, 162, .08)',
    hoverOpacity: .08,
    selected: 'rgba(114, 209, 162, .14)',
    selectedOpacity: .14,
    disabled: 'rgba(184, 186, 175, .52)',
    disabledBackground: 'rgba(184, 186, 175, .1)',
    disabledOpacity: .52,
    focus: 'rgba(114, 209, 162, .16)',
    focusOpacity: .16,
    activatedOpacity: .18
  },
  control: {
    surface: '#1a1e1a',
    surfaceHover: '#1e231e',
    surfaceDisabled: '#191c19',
    border: 'rgba(241, 238, 229, .38)',
    borderHover: 'rgba(241, 238, 229, .68)',
    borderDisabled: 'rgba(241, 238, 229, .18)',
    placeholder: '#b8baaf',
    disabledText: 'rgba(184, 186, 175, .52)'
  },
  divider: 'rgba(241, 238, 229, .2)'
};

export function createAppTheme( mode, fontFamily = 'Arial, sans-serif' ) {
  const palette = mode === 'dark' ? darkPalette : lightPalette;

  return createTheme( {
    cssVariables: true,
    palette: { mode, ...palette },
    shape: { borderRadius: 10 },
    spacing: 8,
    typography: {
      fontFamily,
      button: { fontWeight: 650, textTransform: 'none' }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { colorScheme: mode },
          'html, body': {
            width: '100%',
            minHeight: '100%',
            margin: 0
          },
          body: {
            color: palette.text.primary,
            backgroundColor: palette.background.default
          },
          '*, *::before, *::after': {
            boxSizing: 'border-box'
          },
          'input:not(.MuiInputBase-input):focus-visible, textarea:not(.MuiInputBase-input):focus-visible, select:not(.MuiInputBase-input):focus-visible': {
            outline: `2px solid ${palette.primary.main}`,
            outlineOffset: 2
          },
          '.MuiInputBase-input:focus-visible': { outline: 'none' },
          'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, textarea:-webkit-autofill, textarea:-webkit-autofill:hover, textarea:-webkit-autofill:focus': {
            WebkitTextFillColor: `${palette.text.primary} !important`,
            caretColor: palette.primary.main,
            WebkitBoxShadow: `0 0 0 100px ${palette.control.surface} inset !important`,
            WebkitBackgroundClip: 'text'
          }
        }
      },
      MuiButtonBase: {
        defaultProps: { disableRipple: true }
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            minHeight: 40,
            borderRadius: 10,
            paddingInline: 16,
            fontWeight: 700,
            transition: 'background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease',
            '&:active': { transform: 'translateY(1px)' }
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            marginTop: 6,
            padding: 6,
            border: `1px solid ${palette.control.border}`,
            borderRadius: 12,
            color: palette.text.primary,
            backgroundImage: 'none',
            backgroundColor: palette.background.paper,
            boxShadow: `0 18px 48px ${alpha( '#000', mode === 'dark' ? .34 : .16 )}`
          },
          list: { padding: 0 }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            minHeight: 42,
            borderRadius: 8,
            paddingInline: 12,
            color: palette.text.primary,
            fontSize: '.88rem',
            transition: 'background-color 160ms ease, color 160ms ease',
            '& + &': { marginTop: 2 },
            '&:hover': { backgroundColor: palette.action.hover },
            '&.Mui-focusVisible': {
              color: palette.text.primary,
              backgroundColor: palette.action.focus
            },
            '&.Mui-selected': {
              color: palette.text.primary,
              backgroundColor: palette.action.selected
            },
            '&.Mui-selected:hover': { backgroundColor: alpha( palette.primary.main, .22 ) },
            '&.Mui-disabled': { color: palette.control.disabledText }
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: palette.text.primary,
            caretColor: palette.primary.main,
            '&.Mui-disabled': { color: palette.control.disabledText }
          },
          input: {
            color: 'inherit',
            '&::placeholder': {
              color: palette.control.placeholder,
              opacity: 1
            },
            '&.Mui-disabled': {
              color: palette.control.disabledText,
              WebkitTextFillColor: palette.control.disabledText
            }
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            color: palette.text.primary,
            '&::before': { borderBottomColor: palette.control.border },
            '&:hover:not(.Mui-disabled):not(.Mui-error)::before': { borderBottomColor: palette.control.borderHover },
            '&::after': { borderBottomColor: palette.primary.main },
            '&.Mui-error::before, &.Mui-error::after': { borderBottomColor: palette.error.main },
            '&.Mui-disabled::before': { borderBottomColor: palette.control.borderDisabled }
          }
        }
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            color: palette.text.primary,
            backgroundColor: palette.control.surface,
            '&:hover:not(.Mui-disabled)': { backgroundColor: palette.control.surfaceHover },
            '&.Mui-focused': { backgroundColor: palette.control.surface },
            '&.Mui-disabled': { backgroundColor: palette.control.surfaceDisabled },
            '&::before': { borderBottomColor: palette.control.border },
            '&:hover:not(.Mui-disabled):not(.Mui-error)::before': { borderBottomColor: palette.control.borderHover },
            '&::after': { borderBottomColor: palette.primary.main },
            '&.Mui-error::before, &.Mui-error::after': { borderBottomColor: palette.error.main },
            '&.Mui-disabled::before': { borderBottomColor: palette.control.borderDisabled }
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: palette.text.primary,
            backgroundColor: palette.control.surface,
            transition: 'box-shadow 180ms ease',
            '& .MuiInputAdornment-root, & .MuiSvgIcon-root': {
              color: palette.text.secondary
            },
            '&:hover:not(.Mui-disabled):not(.Mui-error)': {
              backgroundColor: palette.control.surfaceHover,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: palette.control.borderHover }
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 4px ${alpha( palette.primary.main, .1 )}`,
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: 2,
                borderColor: palette.primary.main
              },
              '& .MuiInputAdornment-root, & .MuiSvgIcon-root': { color: palette.primary.main }
            },
            '&.Mui-error': {
              '& .MuiOutlinedInput-notchedOutline': { borderColor: palette.error.main },
              '& .MuiInputAdornment-root, & .MuiSvgIcon-root': { color: palette.error.main }
            },
            '&.Mui-error.Mui-focused': { boxShadow: `0 0 0 4px ${alpha( palette.error.main, .1 )}` },
            '&.Mui-disabled': {
              color: palette.control.disabledText,
              backgroundColor: palette.control.surfaceDisabled,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: palette.control.borderDisabled },
              '& .MuiInputAdornment-root, & .MuiSvgIcon-root': { color: palette.control.disabledText }
            }
          },
          notchedOutline: {
            borderWidth: 1,
            borderColor: palette.control.border
          },
          input: { '&:focus-visible': { outline: 'none' } }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: palette.text.secondary,
            '&.Mui-focused': { color: palette.primary.main },
            '&.Mui-error': { color: palette.error.main },
            '&.Mui-disabled': { color: palette.control.disabledText }
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: palette.text.secondary,
            '&.Mui-focused': { color: palette.primary.main },
            '&.Mui-error': { color: palette.error.main },
            '&.Mui-disabled': { color: palette.control.disabledText }
          }
        }
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: palette.text.secondary,
            '&.Mui-error': { color: palette.error.main },
            '&.Mui-disabled': { color: palette.control.disabledText }
          }
        }
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color: palette.text.secondary,
            '& .MuiTypography-root, & .MuiSvgIcon-root': { color: 'inherit' }
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          select: { color: palette.text.primary },
          icon: {
            color: palette.text.secondary
          },
          iconOpen: { color: palette.primary.main },
          nativeInput: { color: palette.text.primary }
        }
      },
      MuiNativeSelect: {
        styleOverrides: {
          select: {
            color: palette.text.primary,
            backgroundColor: palette.control.surface,
            '&:focus': { backgroundColor: palette.control.surface }
          },
          icon: { color: palette.text.secondary }
        }
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            '& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator': {
              color: palette.text.secondary
            },
            '& .Mui-focused .MuiAutocomplete-popupIndicator, & .Mui-focused .MuiAutocomplete-clearIndicator': {
              color: palette.primary.main
            }
          },
          paper: {
            border: `1px solid ${palette.control.border}`,
            color: palette.text.primary,
            backgroundColor: palette.background.paper,
            backgroundImage: 'none'
          },
          option: {
            color: palette.text.primary,
            '&[aria-selected="true"]': { backgroundColor: palette.action.selected },
            '&.Mui-focused': { backgroundColor: palette.action.focus }
          },
          noOptions: { color: palette.text.secondary }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderColor: palette.control.border,
            transition: 'background-color 160ms ease, border-color 160ms ease, color 160ms ease',
            '&.MuiChip-clickable:hover': { backgroundColor: palette.action.hover },
            '&.Mui-focusVisible': {
              borderColor: palette.primary.main,
              backgroundColor: palette.action.focus
            },
            '&.Mui-disabled': {
              borderColor: palette.control.borderDisabled,
              color: palette.control.disabledText,
              backgroundColor: palette.action.disabledBackground
            }
          },
          deleteIcon: {
            color: palette.text.secondary,
            '&:hover': { color: palette.error.main }
          }
        }
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            borderColor: palette.control.border,
            color: palette.text.primary,
            '&:hover': { backgroundColor: palette.action.hover },
            '&.Mui-selected': {
              color: palette.primary.contrastText,
              backgroundColor: palette.primary.main
            },
            '&.Mui-disabled': { color: palette.control.disabledText }
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: palette.text.secondary,
            '&:hover': { color: palette.primary.main, backgroundColor: palette.action.hover },
            '&.Mui-focusVisible': { color: palette.primary.main, backgroundColor: palette.action.focus },
            '&.Mui-disabled': { color: palette.control.disabledText }
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: palette.text.secondary,
            '&.Mui-checked, &.MuiCheckbox-indeterminate': { color: palette.primary.main },
            '&.Mui-disabled': { color: palette.control.disabledText }
          }
        }
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: palette.text.secondary,
            '&.Mui-checked': { color: palette.primary.main },
            '&.Mui-disabled': { color: palette.control.disabledText }
          }
        }
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined' }
      },
      MuiDialog: {
        defaultProps: { transitionDuration: 180 }
      },
      MuiTypography: {
        defaultProps: { variant: 'inherit' }
      }
    }
  } );
}
