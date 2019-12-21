import React, { Component } from "react";
class Display extends Component {
  render() {
    return (
      <div className="container-fluid" id="disp">
        <div className="row">
          <div className="col-12 text-center text-white mt-5">
            <h1>REACT STORE</h1>
            <h3>Clothes, Shoes and bags</h3>
            <button type="button" className="btn btn-primary" id="shop">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Display;
