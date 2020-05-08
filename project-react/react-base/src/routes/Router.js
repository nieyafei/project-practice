import React, { Component } from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import App from '../App';

// other
import Page404 from "../pages/404";

export default class CRouter extends Component {
  requireAuth = (permission, component) => {
      const { store } = this.props;
      const { auth } = store.getState().httpData;
      if (!auth || !auth.data.permissions.includes(permission)) window.location.hash = '/404';
      return component;
  };
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" component={App} />
          <Route component={Page404} />
        </Switch>
      </HashRouter>
    )
  }
}
