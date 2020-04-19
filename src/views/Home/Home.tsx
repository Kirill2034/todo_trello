import React, { useEffect, useState } from 'react';
import classes from './Home.module.css';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router';
import { API_CLIENT } from '../../api';
import { Todo } from '../../components/Todo';
import { Pagination } from '../../components/Pagination';
import { ITodo } from '../../types';

const Home = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const todosPerPage = 5;

  const history = useHistory();
  const { t } = useTranslation();

  const onClick = () => {
    history.push('/create');
  };

  useEffect(() => {
    async function getTodos() {
      setLoading(true);
      const { data } = await API_CLIENT.get('/todos');
      setTodos(data);
      setLoading(false);
    }

    getTodos();
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const start = currentPage * todosPerPage;
  const end = start + todosPerPage;

  const pageTodos = todos.slice(start, end);

  const onDelete = async (index: number) => {
    const todo = todos[index];

    await API_CLIENT.delete('/todos/' + todo.id);

    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const onDone = async (index: number) => {
    const todo = todos[index];

    const { data } = await API_CLIENT.put('/todos/' + todo.id, {
      done: !todo.done,
    });

    const newTodos = [...todos];
    newTodos.splice(index, 1, data);
    setTodos(newTodos);
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    history.replace('/login');

    API_CLIENT.delete('/logout');
  };

  return (
    <Box className={classes.Wrap}>
      <Box position="absolute" right="150px" top="20px">
        <Button
          type="button"
          onClick={onClick}
          variant="contained"
          color="secondary"
        >
          {t('home.createTodo')}
        </Button>
      </Box>
      <Box position="absolute" right="20px" top="20px">
        <Button
          type="button"
          onClick={onLogout}
          variant="contained"
          color="primary"
        >
          {t('home.logout')}
        </Button>
      </Box>
      <Box className={classes.WrappeTodo}>
        {pageTodos.map((todo, index) => (
          <Todo
            todo={todo}
            key={index}
            onDelete={onDelete}
            onDone={onDone}
            index={index}
            loading={loading}
          />
        ))}
        <Box className={classes.Pagination}>
          <Pagination
            todosPerPage={todosPerPage}
            totalTodos={todos.length}
            paginate={paginate}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
