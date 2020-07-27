import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import ToPng from "./ToPng";

export default ({match})=> {
  console.log(match)
  let { url } = useRouteMatch();
  console.log(url)
  return (
    <React.Fragment>
      <Switch>
        <Route path={`${url}/to-png`} component={ToPng} />
        <Redirect exact to={`${url}/to-png`} from="/app/pdf" />
      </Switch>
    </React.Fragment>
  )
}