import React from "react";
import "./App.css";
import "./components/assets/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import Login from "./components/login";
import Register from "./components/register";
import Admin from "./components/admin";
// import axios from "axios";
import { connect } from "react-redux";
// import ProtectedRoute from "./protectedRoute";
// import { authenticate } from "./actions/index";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isAuthenticated: false
    };
  }
  componentDidMount() {
    // this.props.authenticate();

    console.log(this.props);
  }

  render() {
    // this.props.authenticate();

    console.log(this.props.isAuthenticated);
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            <Route
              path="/admin"
              exact={false}
              render={props => {
                return (
                  <div>
                    {this.props.isAuthenticated ? (
                      <Admin {...props} />
                    ) : (
                      <Login {...props} />
                    )}
                  </div>
                );
              }}
            />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     authenticate: () => dispatch(authenticate())
//   };
// }
function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated
  };
}

export default connect(mapStateToProps, null)(App);
