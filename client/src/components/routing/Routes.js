import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from '../admin/index';
import Flip from '../games/Flip/index.js';
import Dice from '../games/Dice/index.js';
import NotFound from '../layout/NotFound';

const Routes = props => {
  return (
    <>
      <Switch>
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/flip" component={Flip} />
        <Route exact path="/dice" component={Dice} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default Routes;
