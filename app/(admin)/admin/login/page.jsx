'use client';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Box from '@mui/material/Box';
import Toast from '@/components/Toast';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MuiLink from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ADMIN_ENDPOINT } from '@/constants/endpoint';
import { TOAST_STATUS } from '@/constants/toast';
import axiosInstance from '@/lib/axios';
import { validationAdminLoginSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { AdminPageTitle, LoginMark, LoginNarrative, LoginPanel, LoginShell, LoginStage, MutedText } from '@/components/styled/Admin.styles';

function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState( false );
  const form = useForm( {
    resolver: yupResolver( validationAdminLoginSchema ),
    mode: 'onChange'
  } );

  const {
    formState: { isSubmitting },
    control,
    handleSubmit,
    reset
  } = form;

  const onSubmit = async ( credentials ) => {
    try {
      await axiosInstance.post( ADMIN_ENDPOINT.LOGIN, credentials );
      reset( { username: '', password: '' } );
      router.push( '/admin' );
    } catch ( error ) {
      Toast( {
        title: error.response?.data?.message || 'Login failed. Please check your credentials.',
        type: TOAST_STATUS.error
      } );
    }
  };
  return (
    <LoginShell>
      <LoginNarrative>
        <LoginMark component="p">CHUNG<Box component="span">.</Box> / ADMIN</LoginMark>
        <Box sx={ { position: 'relative', zIndex: 1, display: 'grid', gap: 2 } }>
          <Typography component="p" sx={ { color: 'primary.main', fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' } }>Private Workspace</Typography>
          <Typography component="h2" sx={ { maxWidth: '10ch', fontSize: 'clamp(3rem, 5vw, 5.5rem)', fontWeight: 620, letterSpacing: '-.055em', lineHeight: .9 } }>Operate the portfolio with clarity.</Typography>
          <Typography component="p" sx={ { maxWidth: '44ch', color: 'text.secondary', fontSize: '.9rem', lineHeight: 1.6 } }>Review content evidence, respond to inquiries, and monitor portfolio activity from one protected workspace.</Typography>
        </Box>
        <MutedText component="p">Protected admin access · Rate limited · HTTP-only session</MutedText>
      </LoginNarrative>

      <LoginStage>
        <LoginPanel>
          <Box sx={ { display: 'grid', gap: 1 } }>
            <LoginMark component="p" sx={ { display: { md: 'none' }, mb: 2 } }>CHUNG<Box component="span">.</Box> / ADMIN</LoginMark>
            <Typography component="p" sx={ { color: 'primary.main', fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' } }>Secure Access</Typography>
            <AdminPageTitle component="h1">Portfolio operations</AdminPageTitle>
            <MutedText component="p">Sign in with your administrator credentials.</MutedText>
          </Box>

          <Box component="form" onSubmit={ handleSubmit( onSubmit ) } noValidate sx={ { display: 'grid', gap: 2.25 } }>
            <Controller
              name="username"
              control={ control }
              defaultValue=""
              render={ ( { field, fieldState } ) => (
                <TextField
                  { ...field }
                  label="Username"
                  autoComplete="username"
                  disabled={ isSubmitting }
                  error={ Boolean( fieldState.error ) }
                  helperText={ fieldState.error?.message || ' ' }
                  fullWidth
                />
              ) }
            />
            <Controller
              name="password"
              control={ control }
              defaultValue=""
              render={ ( { field, fieldState } ) => (
                <TextField
                  { ...field }
                  label="Password"
                  type={ showPassword ? 'text' : 'password' }
                  autoComplete="current-password"
                  disabled={ isSubmitting }
                  error={ Boolean( fieldState.error ) }
                  helperText={ fieldState.error?.message || ' ' }
                  fullWidth
                  slotProps={ {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={ () => setShowPassword( current => !current ) } aria-label={ showPassword ? 'Hide password' : 'Show password' }>
                            { showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon /> }
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  } }
                />
              ) }
            />
            <Button size="large" type="submit" variant="contained" fullWidth disabled={ isSubmitting }>
              { isSubmitting ? 'Signing In…' : 'Sign In' }
            </Button>
          </Box>

          <MuiLink component={ NextLink } href="/" underline="hover" color="text.secondary" sx={ { display: 'inline-flex', alignItems: 'center', gap: .75, width: 'fit-content', fontSize: '.75rem' } }>
            <ArrowBackOutlinedIcon fontSize="small" aria-hidden="true" /> Back to Portfolio
          </MuiLink>
        </LoginPanel>
      </LoginStage>
    </LoginShell>
  );
}

export default AdminLogin;
