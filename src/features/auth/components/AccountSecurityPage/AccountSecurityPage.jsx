'use client';

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ADMIN_ENDPOINT } from '@/shared/api/endpoints';
import axiosInstance from '@/shared/api/http-client';
import NextLink from 'next/link';
import { useState } from 'react';
import { SourceNotice, StudioDescription, StudioEyebrow, StudioHeader, StudioPage, StudioTitle } from '@/features/admin-shell/styles/ContentStudio.styles';
import { AccountGrid, FormActions, SecurityAside, SecurityForm } from './AccountSecurityPage.styles';

const initialFields = { currentPassword: '', newPassword: '', confirmPassword: '' };

export default function AccountSecurityPage() {
  const [fields, setFields] = useState( initialFields );
  const [errors, setErrors] = useState( {} );
  const [showPasswords, setShowPasswords] = useState( false );
  const [submitting, setSubmitting] = useState( false );
  const [complete, setComplete] = useState( false );
  const [requestError, setRequestError] = useState( '' );

  const updateField = event => {
    setFields( current => ( { ...current, [event.target.name]: event.target.value } ) );
    setErrors( current => ( { ...current, [event.target.name]: '' } ) );
  };

  const submit = async event => {
    event.preventDefault();
    setRequestError( '' );
    if ( fields.newPassword !== fields.confirmPassword ) {
      setErrors( { confirmPassword: 'Passwords do not match' } );
      return;
    }

    setSubmitting( true );
    try {
      await axiosInstance.post( ADMIN_ENDPOINT.CHANGE_PASSWORD, { currentPassword: fields.currentPassword, newPassword: fields.newPassword } );
      setFields( initialFields );
      setComplete( true );
    } catch ( error ) {
      const payload = error.response?.data;
      if ( !payload ) {setRequestError( 'Unable to reach the security service. Try again.' );}
      else if ( payload.data?.field ) {setErrors( { [payload.data.field]: payload.message } );}
      else {setRequestError( payload.message || 'Unable to change password.' );}
    } finally {
      setSubmitting( false );
    }
  };

  return (
    <StudioPage>
      <StudioHeader>
        <Box>
          <StudioEyebrow component="p">Account · Security</StudioEyebrow>
          <StudioTitle component="h1">Protect admin access</StudioTitle>
          <StudioDescription component="p">Change the administrator password and review the controls protecting this workspace.</StudioDescription>
        </Box>
      </StudioHeader>

      <SourceNotice>
        <SecurityOutlinedIcon aria-hidden="true" />
        <Box>
          <Typography component="p">Security boundary</Typography>
          <Typography component="p">A successful password change clears this browser&apos;s admin cookies. Sign in again with the new password.</Typography>
        </Box>
      </SourceNotice>

      <AccountGrid>
        <SecurityForm component="form" onSubmit={ submit }>
          <Box component="header">
            <Typography component="h2" sx={ { fontSize: '1.25rem', fontWeight: 700 } }>Change password</Typography>
            <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.84rem' } }>Use a unique password that is not shared with another account.</Typography>
          </Box>

          { requestError && <Alert severity="error">{ requestError }</Alert> }
          { complete ? (
            <Alert severity="success" icon={ <CheckCircleOutlineOutlinedIcon/> } action={ <Button component={ NextLink } href="/admin/login" color="inherit">Sign In</Button> }>
              Password changed. Your admin session has been signed out.
            </Alert>
          ) : (
            <>
              <TextField
                name="currentPassword"
                label="Current Password"
                type={ showPasswords ? 'text' : 'password' }
                value={ fields.currentPassword }
                onChange={ updateField }
                error={ !!errors.currentPassword }
                helperText={ errors.currentPassword }
                autoComplete="current-password"
                required
                fullWidth
              />
              <TextField
                name="newPassword"
                label="New Password"
                type={ showPasswords ? 'text' : 'password' }
                value={ fields.newPassword }
                onChange={ updateField }
                error={ !!errors.newPassword }
                helperText={ errors.newPassword || '12–128 characters with uppercase, lowercase, number, and symbol' }
                autoComplete="new-password"
                required
                fullWidth
              />
              <TextField
                name="confirmPassword"
                label="Confirm New Password"
                type={ showPasswords ? 'text' : 'password' }
                value={ fields.confirmPassword }
                onChange={ updateField }
                error={ !!errors.confirmPassword }
                helperText={ errors.confirmPassword }
                autoComplete="new-password"
                required
                fullWidth
                slotProps={ { input: { endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="button" aria-label={ showPasswords ? 'Hide passwords' : 'Show passwords' } onClick={ () => setShowPasswords( value => !value ) } edge="end">
                      { showPasswords ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/> }
                    </IconButton>
                  </InputAdornment>
                ) } } }
              />
              <FormActions>
                <Button type="submit" variant="contained" startIcon={ <LockResetOutlinedIcon/> } disabled={ submitting }>
                  { submitting ? 'Updating…' : 'Update Password' }
                </Button>
              </FormActions>
            </>
          ) }
        </SecurityForm>

        <SecurityAside component="aside">
          <Typography component="h2" sx={ { fontSize: '1.1rem', fontWeight: 700 } }>Active controls</Typography>
          <Box component="ul">
            <Box component="li">HTTP-only, same-site session cookies</Box>
            <Box component="li">Short-lived access token with signed refresh token</Box>
            <Box component="li">Rate-limited login and password attempts</Box>
            <Box component="li">Authorization checks inside every admin route</Box>
            <Box component="li">Generic server errors without internal details</Box>
          </Box>
        </SecurityAside>
      </AccountGrid>
    </StudioPage>
  );
}
