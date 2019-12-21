import React, { Component } from "react";
import "./assets/item.css";
class Item extends Component {
  state = {};

  render() {
    let { details } = this.props;
    // console.log(this.props);
    return (
      <div className="col-md-3 mb-3">
        <div className="card shadow">
          <img
            className="card-img-top img"
            src={require(`./assets/pictures/${details.pics}`)}
            alt="item"
          />
          <div className="card-body">
            <p>{details.itemName}</p>
            <button
              onClick={() => this.props.handleCart(details)}
              type="button"
              className="btn btn-secondary"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
