import React, { Component } from "react";
import axios from "axios";
import { withFormik } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import { connect } from "react-redux";
import { authenticate } from "../actions/index";

const fields = [
  { name: "email", type: "email", placeholder: "Email address", ac: "off" },
  { name: "password", type: "text", placeholder: "Password", ac: "off" }
];

class Login extends Component {
  state = {};

  handleLogin = event => {
    event.preventDefault();
    let email = document.getElementsByName("email")[0].value;
    let password = document.getElementsByName("password")[0].value;
    let submit = document.getElementsByName("submit")[0].value;
    let alert = document.getElementById("myAlert");

    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: "http://localhost:80/react_ecommerce/backend/login.php",
      data: {
        email,
        password,
        submit
      }
    })
      .then(res => {
        // console.log(res);
        console.log(res.data);
        if (res.data.message === "logged in successfuly") {
          alert.classList.remove("d-none", "alert-danger");
          alert.classList.add("d-block", "alert-success");
          alert.innerHTML = res.data.message;
          document.getElementsByName("email")[0].value = "";
          document.getElementsByName("password")[0].value = "";
          // window.location = "admin";
          // sessionStorage.setItem("email", res.data.trim());
          localStorage.setItem("access_key", res.data.access_key);
          this.props.authenticate();
          console.log(this.props);
          console.log(this.props.history);
          this.props.history.push("/admin");
        } else {
          alert.innerHTML = res.data.message;
          alert.classList.remove("d-none", "alert-success");
          alert.classList.add("d-block", "alert-danger");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="col text-center">
        <form onSubmit={this.handleLogin} className="form-signin w-25 m-me">
          <h1 className="border border-warning mb-5 text-warning">
            React Shop
          </h1>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <div className="alert alert-danger p-0 d-none" id="myAlert"></div>
          {/* <small id="myAlert" className="my-1"></small> */}
          {fields.map((f, i) => (
            <Input
              key={i}
              {...f}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
              touched={this.props.touched[f.name]}
              errors={this.props.errors[f.name]}
            />
          ))}

          <input
            name="submit"
            className="btn btn-lg btn-primary btn-block mt-3 mb-2"
            type="submit"
            value="Sign in"
          />

          <a href="register">Register ?</a>
          <p className="mt-5 mb-3 text-muted">© 2019-2020</p>
        </form>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    authenticate: () => dispatch(authenticate())
  };
}
export default connect(
  null,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues: () => ({
      email: "",
      password: ""
    }),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email()
        .required("Email is required"),
      password: Yup.string().required("Password is required")
    })
  })(Login)
);
