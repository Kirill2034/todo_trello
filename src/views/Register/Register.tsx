import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100%"
      alignItems="center"
    >
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <Box mb="16px">
                <Field
                  name="firstName"
                  render={({ input }) => (
                    <TextField
                      {...input}
                      label={t('register.firstnamePlaceholder')}
                      style={{ width: '250px' }}
                    />
                  )}
                />
              </Box>

              <Box mb="16px">
                <Field
                  name="lastName"
                  render={({ input }) => (
                    <TextField
                      {...input}
                      label={t('register.lastNamePlaceholder')}
                      style={{ width: '250px' }}
                    />
                  )}
                />
              </Box>

              <Box mb="16px">
                <Field
                  name="login"
                  render={({ input }) => (
                    <TextField
                      {...input}
                      label={t('register.loginPlaceholder')}
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
                      label={t('register.passwordPlaceholder')}
                      style={{ width: '250px' }}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                {t('register.submitButton')}
              </Button>
            </Box>
          </form>
        )}
      />
    </Box>
  );
};
export default Register;
