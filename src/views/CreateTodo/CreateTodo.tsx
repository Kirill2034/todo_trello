import React from 'react';
import { Form, Field } from 'react-final-form';
import { Box, TextField, Button } from '@material-ui/core';
import { API_CLIENT } from '../../api';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import classes from './CreateTodo.module.css';

const CreateTodo = () => {
  const history = useHistory();

  const onSubmit = async (values: any) => {
    if (values !== '') {
      await API_CLIENT.post('/todos', values);

      history.goBack();
    } else {
      return;
    }
  };

  const { t } = useTranslation();

  return (
    <Box className={classes.Wrapper}>
      <Box className={classes.Header}>{t('createTodo.createANewGoal')}</Box>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box className={classes.TextField}>
              <Field
                name="name"
                render={({ input }) => (
                  <TextField
                    {...input}
                    label="TODO"
                    variant="outlined"
                    color="secondary"
                    style={{ marginRight: '15px', width: '400px' }}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {t('createTodo.create')}
              </Button>
            </Box>
          </form>
        )}
      />
    </Box>
  );
};
export default CreateTodo;
