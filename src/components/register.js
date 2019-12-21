import React, { Component } from "react";
import axios from "axios";
import * as Yup from "yup";
import { withFormik } from "formik";
// import { addUser } from "../actions/index";
import Input from "./Input";
import { connect } from "react-redux";

const fields = [
  { name: "firstname", type: "text", placeholder: "firstname here", ac: "on" },
  { name: "lastname", type: "text", placeholder: "lastname here", ac: "on" },
  { name: "email", type: "email", placeholder: "email here", ac: "on" },
  {
    name: "password",
    type: "password",
    placeholder: "password here",
    ac: "off"
  },
  {
    name: "cpassword",
    type: "password",
    placeholder: "password here",
    ac: "off"
  }
];

class Register extends Component {
  state = {};

  handleRegister = event => {
    event.preventDefault();

    // console.log(event);
    // console.log(this);

    // this.props.resetForm({});
    console.log(this.props.values);
    let errorlen = Object.keys(this.props.errors).length;
    if (!errorlen) {
      let { firstname, lastname, email, password } = this.props.values;
      console.log(this.props.values);
      let submit = document.getElementsByName("submit")[0].value;
      let alert = document.getElementById("myAlert");

      axios
        .post(
          "http://localhost:80/react_ecommerce/backend/register.php",
          {
            fname: firstname,
            lname: lastname,
            email: email,
            passw: password,
            submit: submit
          },
          {
            headers: {
              "Content-type": "text/plain"
            }
          }
        )
        .then(res => {
          alert.innerHTML = res.data;
          console.log(res.data);
          if (res.data === "Registration Successful.. Sign In") {
            document.getElementById("myForm").reset();
            alert.classList.remove("d-none", "alert-danger");
            alert.classList.add("d-block", "alert-success");

            console.log(this.props.values);
          } else {
            alert.classList.remove("d-none", "alert-success");
            alert.classList.add("d-block", "alert-danger");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };
  render() {
    return (
      <div className="signup-form text-center p-3">
        <form
          className="w-25 m-auto"
          onSubmit={this.handleRegister}
          id="myForm"
        >
          <h2>Register</h2>
          <p className="hint-text">
            Create your account. It's free and only takes a minute.
          </p>
          <small id="myAlert" className="my-1"></small>
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
          <div className="form-group">
            <input
              type="submit"
              name="submit"
              className="btn btn-success btn-lg btn-block"
              value="Register Now"
            />
          </div>
        </form>
        <div className="text-center">
          Already have an account? <a href="login">Sign in</a>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  // return {
  //   addUser: user => dispatch(addUser(user))
  // };
}

export default connect(
  null,
  mapDispatchToProps
)(
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      cpassword: ""
    }),
    validationSchema: Yup.object().shape({
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email()
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "8 characters or more"),
      cpassword: Yup.string()
        .required("Password is required")
        .min(8, "8 characters or more")
        .oneOf([Yup.ref("password"), null], "Passwords must match!")
    })
  })(Register)
);
