import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar bg-light">
        <Link
          to={{
            pathname: "/",
            state: {
              id: this.props.cartitems
            }
          }}
        >
          React shop
        </Link>

        <Link
          to={{
            pathname: "/cart",
            state: {
              id: this.props.cartitems
            }
          }}
          className="btn btn-secondary"
        >
          View Cart{" "}
          <span className="badge badge-primary ml-2">
            {this.props.cartitems.length}
          </span>
        </Link>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>
      </nav>
    );
  }
}

export default Navbar;
