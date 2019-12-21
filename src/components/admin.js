import React, { Component } from "react";
import View from "./view";
import { NavLink } from "react-router-dom";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    // console.log("smtin");
    localStorage.removeItem("access_key");
    // console.log(this.props);
    // console.log(this.props.history);
    this.props.history.push("/login");
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow mb-5">
          <a
            href="#h"
            className="navbar-brand col-sm-3 col-md-2 mr-0 text -white"
          >
            React Shop
          </a>
          <input
            className="form-control form-control-dark w-100"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <button
                onClick={this.handleLogout}
                className="nav-link btn shadow-none"
              >
                Sign out
              </button>
            </li>
          </ul>
        </nav>

        <div className="container-fluid mt-5 ">
          <div className="row">
            <nav
              style={{ height: "100vh" }}
              className="col-md-2 d-none d-md-block bg-light sidebar"
            >
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item p-3">
                    <NavLink to="/admin/dashboard">Dashboard</NavLink>
                  </li>
                  <li className="nav-item p-3">
                    <NavLink to="/admin/product">Product</NavLink>
                  </li>
                  <li className="nav-item p-3">Products</li>
                  <li className="nav-item p-3">Customers</li>
                  <li className="nav-item p-3">Reports</li>
                  <li className="nav-item p-3">Integrations</li>
                </ul>
              </div>
            </nav>

            <View />
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
