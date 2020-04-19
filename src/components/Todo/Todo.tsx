import React from 'react';
import { Box, Checkbox, Button } from '@material-ui/core';
import classes from './Todo.module.css';
import { ITodo } from '../../types';
import { useTranslation } from 'react-i18next';

type Props = {
  todo: ITodo;
  onDelete: (index: number) => void;
  index: number;
  onDone: (index: number) => void;
  loading: boolean;
};

const Todo: React.FC<Props> = ({ todo, onDelete, index, onDone, loading }) => {
  const { t } = useTranslation();

  if (loading) {
    return <h2 style={{ color: 'red' }}>Loading...</h2>;
  }

  return (
    <Box className={classes.Todo}>
      <Box className={classes.Wrap}>
        <Checkbox
          onClick={() => onDone(index)}
          checked={todo.done}
          color="secondary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <p>{todo.name}</p>
      </Box>
      <Button color="secondary" onClick={() => onDelete(index)}>
        {t('todo.delete')}
      </Button>
    </Box>
  );
};
export default Todo;
