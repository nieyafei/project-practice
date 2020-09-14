import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import Code from "./Code";

export default ({match})=> {
  let { url } = useRouteMatch();
  return (
    <React.Fragment>
      <Switch>
        <Route path={`${url}/code`} component={Code} />
        <Redirect exact to={`${url}/code`} from="/app/gufei" />
      </Switch>
    </React.Fragment>
  )
}