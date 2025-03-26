import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme, createTheme } from '@mui/material/styles';
import axios from 'axios';

const customTheme = createTheme({
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: 14,
  },
  palette: {
    primary: {
      main: '#A1E96F',
    },
  },
});

const providers = [{ id: 'credentials', name: 'Email and password' }];

const signIn = async (provider, formData) => {
  try {
    const email = formData?.get('email');
    const password = formData?.get('password');

    const response = await axios.post('https://epaydatabase.onrender.com/login', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // If login successful
    if (response.data.message === 'Login successful') {
      // Redirect to dashboard
      window.location.href = '/dashboard';
      
      return {
        type: 'CredentialsSignin',
        success: true,
        data: response.data
      };
    }

  } catch (error) {
    return {
      type: 'CredentialsSignin',
      error: error.response?.data?.message || 'Login failed'
    };
  }
};

export default function SignInpage() {
  const theme = useTheme();
  const mergedTheme = createTheme({
    ...customTheme,
    ...theme
  });

  return (
    <AppProvider theme={mergedTheme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ 
          emailField: { autoFocus: false }, 
          form: { noValidate: true },
          submitButton: {
            sx: {
              backgroundColor: '#152F00',
              '&:hover': {
                backgroundColor: '#7cb342'
              }
            }
          }
        }}
      />
    </AppProvider>
  );
}