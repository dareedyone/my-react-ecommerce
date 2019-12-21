import React, { Component } from "react";
class Input extends Component {
  render() {
    return (
      <div className="form-group">
        <input
          type={this.props.type}
          className="form-control"
          name={this.props.name}
          placeholder={this.props.placeholder}
          autoComplete={this.props.ac}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          required="required"
        />
        <p>
          {this.props.touched && this.props.errors ? (
            <small className="text-danger">{this.props.errors}</small>
          ) : (
            ""
          )}
        </p>
      </div>
    );
  }
}

export default Input;
