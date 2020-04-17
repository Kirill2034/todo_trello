import React from 'react';
import { Box, Checkbox, Button } from '@material-ui/core';
import classes from './Todo.module.css';

type Props = {
  name: string;
  checked: boolean;
};

const Todo: React.FC<Props> = ({ name, checked }) => {
  return (
    <Box className={classes.Todo}>
      <Checkbox
        checked={checked}
        color="secondary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <p>{name}</p>
      <Button color="secondary">Удалить</Button>
    </Box>
  );
};
export default Todo;
