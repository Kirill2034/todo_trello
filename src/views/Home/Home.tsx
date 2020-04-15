import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router';
import { API_CLIENT } from '../../api';

const Home = () => {
  const [todos, setTodos] = useState<any[]>([]);

  const history = useHistory();
  const { t } = useTranslation();

  const onClick = () => {
    history.push('/create');
  };

  useEffect(() => {
    async function getTodos() {
      const { data } = await API_CLIENT.get('/todos');

      setTodos(data);
    }
    getTodos();
  }, []);

  return (
    <Box>
      <Box position="absolute" right="20px" top="20px">
        <Button
          type="button"
          onClick={onClick}
          variant="contained"
          color="secondary"
        >
          {t('home.createTodo')}
        </Button>
      </Box>
      {todos.map((todo) => (
        <div>{todo.name}</div>
      ))}
    </Box>
  );
};

export default Home;
