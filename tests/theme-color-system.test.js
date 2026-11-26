import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { createTheme } from '@mui/material/styles';
import { createAppTheme } from '../src/shared/theme/createAppTheme.js';

const expectedColors = {
  light: {
    primary: '#0b6547',
    secondary: '#4e675a',
    success: '#2f6a4b',
    info: '#2e6870',
    warning: '#7b5a20',
    error: '#93483e',
    controlSurface: '#f8f5ed'
  },
  dark: {
    primary: '#72d1a2',
    secondary: '#9fb4a7',
    success: '#78c999',
    info: '#79bac0',
    warning: '#d7aa63',
    error: '#e08a7d',
    controlSurface: '#1a1e1a'
  }
};

for ( const mode of ['light', 'dark'] ) {
  test( `${mode} theme owns every semantic and form-control color`, () => {
    const appTheme = createAppTheme( mode );
    const stockTheme = createTheme( { palette: { mode } } );
    const expected = expectedColors[mode];

    for ( const role of ['primary', 'secondary', 'success', 'info', 'warning', 'error'] ) {
      assert.equal( appTheme.palette[role].main, expected[role] );
      assert.notEqual( appTheme.palette[role].main, stockTheme.palette[role].main );
    }

    assert.equal( appTheme.palette.control.surface, expected.controlSurface );
    for ( const token of ['surfaceHover', 'surfaceDisabled', 'border', 'borderHover', 'borderDisabled', 'placeholder', 'disabledText'] ) {
      assert.ok( appTheme.palette.control[token], `palette.control.${token} must be defined` );
    }

    for ( const component of [
      'MuiInputBase',
      'MuiInput',
      'MuiFilledInput',
      'MuiOutlinedInput',
      'MuiInputLabel',
      'MuiFormLabel',
      'MuiFormHelperText',
      'MuiInputAdornment',
      'MuiSelect',
      'MuiMenu',
      'MuiMenuItem',
      'MuiAutocomplete',
      'MuiChip',
      'MuiPaginationItem'
    ] ) {
      assert.ok( appTheme.components[component]?.styleOverrides, `${component} needs centralized color overrides` );
    }

    assert.equal( appTheme.components.MuiCssBaseline.styleOverrides.html.colorScheme, mode );
    const baseline = JSON.stringify( appTheme.components.MuiCssBaseline.styleOverrides );
    assert.match( baseline, /textarea:-webkit-autofill/ );
    assert.match( baseline, new RegExp( expected.controlSurface, 'i' ) );
  } );
}

test( 'page layouts delegate field surfaces and state colors to the global MUI theme', async () => {
  const files = [
    '../src/features/inbox/components/InboxClient/Inbox.styles.js',
    '../src/features/contact/styles/Contact.styles.js',
    '../src/features/dashboard/styles/Overview.styles.js'
  ];

  for ( const file of files ) {
    const source = await readFile( new URL( file, import.meta.url ), 'utf8' );
    assert.doesNotMatch( source, /MuiOutlinedInput-root[^}]*backgroundColor/s, `${file} must not own field surface colors` );
  }
} );
