import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import classes from './CreateTodo.module.css';

const CreateTodo = () => {
  const [todo, setTodo] = useState('');

  const onClick = () => {
    console.log(todo);
  };

  // const onChange = (event) => {
  //   {todo} = event.target.value;
  //   setTodo({todo})
  // }

  return (
    <Box className={classes.Wrapper}>
      <Box className={classes.Header}>Создай новую цель</Box>
      <Box className={classes.TextField}>
        <TextField
          value={todo}
          label="TODO"
          variant="outlined"
          color="secondary"
          fullWidth
          style={{ marginRight: 20 }}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={onClick}
        >
          Создать
        </Button>
      </Box>
    </Box>
  );
};
export default CreateTodo;
