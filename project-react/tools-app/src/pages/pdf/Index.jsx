import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import ToPng from "./ToPng"

class Main extends Component {
  componentDidMount(){}
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route to="/app/pdf/png" component={ToPng} />
          <Redirect to="/app/pdf/png" from="/app/pdf" exact />
        </Switch>
      </React.Fragment>
    )
  }
}

export default Main;