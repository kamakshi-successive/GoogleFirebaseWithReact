import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Authentication/Login'
import Register from './pages/Authentication/Register'
import Reset from './pages/Authentication/Reset'
import Dashboard from './pages/Dashboard'
import NoFound from './pages/NoFound'
import PublicRoute from './routes/publicRoute';
import PrivateRoute from './routes/privateRoute';

function App() {
  // const {} = getToken();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/reset" component={Reset} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
