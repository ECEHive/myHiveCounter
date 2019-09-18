import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import InventoryPage from './containers/InventoryPage';
import WorkbenchRentalPage from './containers/WorkbenchRentalPage';
import UserManagementPage from './containers/UserManagementPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.INVENTORY} component={InventoryPage} />
      <Route path={routes.WORKBENCH_RENTAL} component={WorkbenchRentalPage} />
      <Route path={routes.USER_MANAGEMENT} component={UserManagementPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
