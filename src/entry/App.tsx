import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '../views/Login';
import { Register } from '../views/Register';
import { Home } from '../views/Home';
import { CreateTodo } from '../views/CreateTodo';

function App() {
  return (
    <Switch>
      <Route path={'/login'}>
        <Login />
      </Route>
      <Route path={'/register'}>
        <Register />
      </Route>

      <Route path={'/'} exact={true}>
        <Home />
      </Route>

      <Route path={'/create'}>
        <CreateTodo />
      </Route>

      <Redirect to={'/login'} />
    </Switch>
  );
}

export default App;
