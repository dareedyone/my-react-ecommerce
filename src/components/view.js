import React, { Component } from "react";
// import Home from "./Home";
import Dashboard from "./dashboard";
import Product from "./product";
import { Route, Switch } from "react-router-dom";
class View extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <Switch>
            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route exact path="/admin/product" component={Product} />
            {/* <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/admin" component={Admin} /> */}

            {/* <Route path="*" component={NotFound} /> */}
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default View;
