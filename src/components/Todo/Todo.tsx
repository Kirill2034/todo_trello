import React from 'react';
import { Box, Checkbox, Button } from '@material-ui/core';
import classes from './Todo.module.css';

type Props = {
  todo: any;
  onDelete: (index: number) => void;
  index: number;
  onDone: (index: number) => void;
};

const Todo: React.FC<Props> = ({ todo, onDelete, index, onDone }) => {
  return (
    <Box className={classes.Todo}>
      <Checkbox
        onClick={() => onDone(index)}
        checked={todo.done}
        color="secondary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <p>{todo.name}</p>
      <Button color="secondary" onClick={() => onDelete(index)}>
        Удалить
      </Button>
    </Box>
  );
};
export default Todo;
