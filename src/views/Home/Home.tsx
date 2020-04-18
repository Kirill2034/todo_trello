import React, { useEffect, useState } from 'react';
import classes from './Home.module.css';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router';
import { API_CLIENT } from '../../api';
import { Todo } from '../../components/Todo';

const Home = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [checked, setChecked] = useState(false);

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
    <Box className={classes.Wrap}>
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
      <Box className={classes.WrappeTodo}>
        {todos.map((todo, index) => (
          <Todo name={todo.name} checked={checked} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
