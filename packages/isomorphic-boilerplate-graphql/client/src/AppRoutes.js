import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
