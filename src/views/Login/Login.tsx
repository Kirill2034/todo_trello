import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { API_CLIENT } from '../../api';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();

  const onSubmit = async (values: any) => {
    const { data } = await API_CLIENT.post('/login', values);

    localStorage.setItem('token', data);

    API_CLIENT.defaults.headers['Authorization'] = data;

    history.replace('/');
  };

  const onRegister = () => {
    history.replace('/register');
  };

  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <Box mb="16px">
                <Field
                  name="login"
                  render={({ input }) => (
                    <TextField
                      {...input}
                      label={t('login.loginPlaceholder')}
                      style={{ width: '250px' }}
                    />
                  )}
                />
              </Box>
              <Box mb="16px">
                <Field
                  type="password"
                  name="password"
                  render={({ input }) => (
                    <TextField
                      {...input}
                      label={t('login.passwordPlaceholder')}
                      style={{ width: '250px' }}
                    />
                  )}
                />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Button type="submit" variant="contained" color="primary">
                  {t('login.submitButton')}
                </Button>
                <Button
                  onClick={onRegister}
                  variant="contained"
                  color="primary"
                >
                  {t('register.submitButton')}
                </Button>
              </Box>
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

export default Login;
