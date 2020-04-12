import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-final-form';
import { Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router';

const Home = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const onSubmit = () => {
    history.replace('/create');
  };

  return (
    <Box position="absolute" right="20px" top="20px">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Button type="submit" variant="contained" color="secondary">
              {t('home.createTodo')}
            </Button>
          </form>
        )}
      />
    </Box>
  );
};

export default Home;
