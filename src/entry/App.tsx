import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '../views/Login';
import { Register } from '../views/Register';
import { Home } from '../views/Home';
import { CreateTodo } from '../views/CreateTodo';
import { PrivateRoute } from './PrivateRoute';

function App() {
  return (
    <Switch>
      <Route path={'/login'}>
        <Login />
      </Route>
      <Route path={'/register'}>
        <Register />
      </Route>

      <PrivateRoute path={'/'} exact={true}>
        <Home />
      </PrivateRoute>

      <PrivateRoute path={'/create'}>
        <CreateTodo />
      </PrivateRoute>

      <Redirect to={'/login'} />
    </Switch>
  );
}

export default App;
