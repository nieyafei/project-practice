import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom';
/* --------- 路由类目 start------------- */
import Index from '../page/Index';
import Index2 from '../page/Index2';
/* --------- 路由类目 end------------- */

export default function Routes(){
  return (
    <>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/index2" component={Index2} />
        {/* <Route path="*" component={()=> <ResultComp type="404" />} /> */}
      </Switch>
    </>
  );
}