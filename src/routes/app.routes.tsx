import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Layout from '../components/Layout';
import List from '../pages/List';

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/list/:type" component={List} />
      </Switch>
    </Layout>
  );
}

export default AppRoutes;